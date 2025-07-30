import 'package:flutter/material.dart';

class YesNoQuestionWidget extends StatelessWidget {
  final Function(String) onSelect;

  const YesNoQuestionWidget({super.key, required this.onSelect});

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
      children: [
        ElevatedButton(
          onPressed: () => onSelect('sim'),
          style: ElevatedButton.styleFrom(backgroundColor: Colors.green),
          child: const Text('Sim'),
        ),
        ElevatedButton(
          onPressed: () => onSelect('não'),
          style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
          child: const Text('Não'),
        ),
      ],
    );
  }
}
