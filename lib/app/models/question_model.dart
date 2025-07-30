import 'package:flutter/material.dart';

class Question {
  final String id;
  final String text;
  final String? subtext;
  final QuestionType type;
  final bool required;
  final List<QuestionOption>? options;
  final String? conditional;
  final String? docType;
  final bool? multiple;

  Question({
    required this.id,
    required this.text,
    this.subtext,
    required this.type,
    this.required = false,
    this.options,
    this.conditional,
    this.docType,
    this.multiple,
  });
}

class QuestionOption {
  final String value;
  final String label;
  final Color? color;

  QuestionOption({
    required this.value,
    required this.label,
    this.color,
  });
}

enum QuestionType {
  auto,
  voice,
  text,
  date,
  cpf,
  document,
  selectColor,
  yesnoColor,
  multiselectColor,
  location,
  number,
  phone,
}
