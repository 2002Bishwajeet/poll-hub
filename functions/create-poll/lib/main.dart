import 'dart:convert';

import 'package:dart_appwrite/dart_appwrite.dart';

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - request body data as a string
    'variables' - object with function variables

  'res' variable has:
    'send(text, status: status)' - function to return text response. Status code defaults to 200
    'json(obj, status: status)' - function to return JSON response. Status code defaults to 200
  
  If an error is thrown, a response with code 500 will be returned.
*/

class Option {
  final String id;
  final String name;
  Option({
    required this.id,
    required this.name,
  });

  factory Option.fromMap(Map<String, dynamic> map) {
    return Option(
      id: map['id'] ?? '',
      name: map['name'] ?? '',
    );
  }

  factory Option.fromJson(String source) => Option.fromMap(json.decode(source));
}

class Poll {
  final String question;
  final List<Option> options;
  Poll({
    required this.question,
    required this.options,
  });

  factory Poll.fromMap(Map<String, dynamic> map) {
    return Poll(
      question: map['question'] ?? '',
      options: List<Option>.from(map['options']?.map((x) => Option.fromMap(x))),
    );
  }

  factory Poll.fromJson(String source) => Poll.fromMap(json.decode(source));
}

Future<void> start(final req, final res) async {
  final client = Client();

  final database = Databases(client);

  if (req.variables['APPWRITE_FUNCTION_ENDPOINT'] == null || req.variables['APPWRITE_FUNCTION_API_KEY'] == null) {
    print("Environment variables are not set. Function cannot use Appwrite SDK.");
  } else {
    client
        .setEndpoint(req.variables['APPWRITE_FUNCTION_ENDPOINT'])
        .setProject(req.variables['APPWRITE_FUNCTION_PROJECT_ID'])
        .setKey(req.variables['APPWRITE_FUNCTION_API_KEY'])
        .setSelfSigned(status: true);
  }

  final jsonPoll = req['payload'];
  if (jsonPoll == null) {
    res.send('Poll data is missing', status: 400);
    return;
  }

  const databaseId = 'default';

  final Poll poll = Poll.fromJson(jsonPoll);

  /// Create Collection
  final collection = await database
      .createCollection(databaseId: databaseId, collectionId: ID.unique(), name: poll.question, permissions: [
    Permission.read(Role.users()),
    Permission.write(Role.users()),
  ]);

  /// Create Attributes
  final attributeResponse = await Future.wait(poll.options
      .map((option) => database.createStringAttribute(
          databaseId: databaseId,
          collectionId: collection.$id,
          key: option.id,
          size: option.name.length + 20,
          xrequired: false))
      .toList());

  res.json({
    'collectionId': collection.$id,
    'collectionName': collection.name,
    'attributes': attributeResponse.map((attribute) => attribute.key).toList(),
  });
}
