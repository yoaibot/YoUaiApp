import 'package:flutter/material.dart';
import 'package:myapp/app/models/question_model.dart';

class SelectColorQuestionWidget extends StatelessWidget {
  final List<QuestionOption> options;
  final Function(String) onSelect;

  const SelectColorQuestionWidget({
    super.key,
    required this.options,
    required this.onSelect,
  });

  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 16,
      runSpacing: 16,
      children: options.map((option) {
        return ElevatedButton(
          onPressed: () => onSelect(option.value),
          style: ElevatedButton.styleFrom(
            backgroundColor: option.color,
          ),
          child: Text(option.label),
        );
      }).toList(),
    );
  }
}
