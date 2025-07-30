import 'package:flutter/material.dart';
import 'package:myapp/app/models/question_model.dart';
import 'package:myapp/app/modules/social_registration/controllers/social_registration_controller.dart';
import 'package:myapp/app/modules/social_registration/widgets/animated_cabiano_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/document_question_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/location_question_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/multiselect_color_question_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/progress_bar_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/select_color_question_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/text_question_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/yesno_question_widget.dart';
import 'package:provider/provider.dart';

class QuestionPage extends StatelessWidget {
  final String blockId;
  final List<dynamic> questions;

  const QuestionPage({
    super.key,
    required this.blockId,
    required this.questions,
  });

  @override
  Widget build(BuildContext context) {
    final controller = Provider.of<SocialRegistrationController>(context);
    final question = questions[controller.currentQuestionIndex] as Question;

    return Scaffold(
      appBar: AppBar(
        title: Text(blockId),
      ),
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFE3F2FD),
              Color(0xFFE8F5E9),
            ],
          ),
        ),
        child: Column(
          children: [
            const AnimatedCabiano(),
            ProgressBarWidget(
              current: controller.currentQuestionIndex,
              total: questions.length,
            ),
            Expanded(
              child: Padding(
                padding: const EdgeInsets.all(16.0),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      question.text,
                      style: Theme.of(context).textTheme.headlineSmall,
                      textAlign: TextAlign.center,
                    ),
                    const SizedBox(height: 20),
                    _buildQuestionWidget(question, controller),
                  ],
                ),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                ElevatedButton(
                  onPressed: controller.previousQuestion,
                  child: const Text('Anterior'),
                ),
                ElevatedButton(
                  onPressed: () {
                    if (controller.currentQuestionIndex < questions.length - 1) {
                      controller.nextQuestion();
                    } else {
                      Navigator.pop(context);
                    }
                  },
                  child: const Text('Próxima'),
                ),
              ],
            )
          ],
        ),
      ),
    );
  }

  Widget _buildQuestionWidget(Question question, SocialRegistrationController controller) {
    switch (question.type) {
      case QuestionType.yesnoColor:
        return YesNoQuestionWidget(
          onSelect: (answer) {
            controller.addAnswer(blockId, question.id, answer);
          },
        );
      case QuestionType.text:
      case QuestionType.voice:
      case QuestionType.cpf:
      case QuestionType.phone:
        return TextQuestionWidget(
          onSave: (answer) {
            controller.addAnswer(blockId, question.id, answer);
          },
        );
      case QuestionType.selectColor:
        return SelectColorQuestionWidget(
          options: question.options!,
          onSelect: (answer) {
            controller.addAnswer(blockId, question.id, answer);
          },
        );
      case QuestionType.multiselectColor:
        return MultiselectColorQuestionWidget(
          options: question.options!,
          onSelect: (answers) {
            controller.addAnswer(blockId, question.id, answers);
          },
        );
      case QuestionType.location:
        return LocationQuestionWidget(
          onLocationSaved: (location) {
            controller.addAnswer(blockId, question.id, location);
          },
        );
      case QuestionType.document:
        return DocumentQuestionWidget(
          docType: question.docType!,
          onImageSaved: (imagePath) {
            controller.addAnswer(blockId, question.id, imagePath);
          },
        );
      default:
        return Container();
    }
  }
}
