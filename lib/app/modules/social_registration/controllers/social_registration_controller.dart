import 'package:flutter/material.dart';
import 'package:myapp/app/models/user_data_model.dart';

class SocialRegistrationController with ChangeNotifier {
  int _currentQuestionIndex = 0;
  final UserData _userData = UserData();

  int get currentQuestionIndex => _currentQuestionIndex;
  UserData get userData => _userData;

  void nextQuestion() {
    _currentQuestionIndex++;
    notifyListeners();
  }

  void previousQuestion() {
    if (_currentQuestionIndex > 0) {
      _currentQuestionIndex--;
      notifyListeners();
    }
  }

  void addAnswer(String blockId, String questionId, dynamic value) {
    _userData.addAnswer(blockId, questionId, value);
    notifyListeners();
  }
}
