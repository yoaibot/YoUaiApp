import 'package:flutter/material.dart';
import 'package:myapp/app/models/question_model.dart';

class MultiselectColorQuestionWidget extends StatefulWidget {
  final List<QuestionOption> options;
  final Function(List<String>) onSelect;

  const MultiselectColorQuestionWidget({
    super.key,
    required this.options,
    required this.onSelect,
  });

  @override
  _MultiselectColorQuestionWidgetState createState() =>
      _MultiselectColorQuestionWidgetState();
}

class _MultiselectColorQuestionWidgetState
    extends State<MultiselectColorQuestionWidget> {
  final List<String> _selectedValues = [];

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Wrap(
          spacing: 16,
          runSpacing: 16,
          children: widget.options.map((option) {
            final isSelected = _selectedValues.contains(option.value);
            return ElevatedButton(
              onPressed: () {
                setState(() {
                  if (isSelected) {
                    _selectedValues.remove(option.value);
                  } else {
                    _selectedValues.add(option.value);
                  }
                });
              },
              style: ElevatedButton.styleFrom(
                backgroundColor: isSelected ? option.color : Colors.grey,
              ),
              child: Text(option.label),
            );
          }).toList(),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () => widget.onSelect(_selectedValues),
          child: const Text('Salvar'),
        ),
      ],
    );
  }
}
