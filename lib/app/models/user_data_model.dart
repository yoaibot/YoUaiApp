class UserData {
  Map<String, Map<String, dynamic>> answers = {};

  void
 
addAnswer(String blockId, String questionId, dynamic value) {
    if (!answers.containsKey(blockId)) {
      answers[blockId] = {};
    }
    answers[blockId]![questionId] = value;
  }

  dynamic getAnswer(String blockId, String questionId) {
    return answers[blockId]?[questionId];
  }
}
