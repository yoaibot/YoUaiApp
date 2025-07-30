import 'package:flutter/material.dart';

class TextQuestionWidget extends StatefulWidget {
  final Function(String) onSave;

  const TextQuestionWidget({super.key, required this.onSave});

  @override
  _TextQuestionWidgetState createState() => _TextQuestionWidgetState();
}

class _TextQuestionWidgetState extends State<TextQuestionWidget> {
  final TextEditingController _textController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        TextField(
          controller: _textController,
          decoration: const InputDecoration(
            hintText: 'Digite sua resposta',
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: () => widget.onSave(_textController.text),
          child: const Text('Salvar'),
        ),
      ],
    );
  }
}
