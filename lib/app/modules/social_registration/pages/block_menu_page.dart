import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/modules/social_registration/pages/question_page.dart';
import 'package:myapp/app/modules/social_registration/utils/question_data.dart';
import 'package:myapp/app/modules/social_registration/widgets/animated_cabiano_widget.dart';
import 'package:myapp/app/modules/social_registration/widgets/progress_bar_widget.dart';
import 'package:provider/provider.dart';
import 'package:myapp/app/modules/social_registration/controllers/social_registration_controller.dart';

class BlockMenuPage extends StatelessWidget {
  const BlockMenuPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Provider.of<SocialRegistrationController>(context);

    return Scaffold(
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
        child: SafeArea(
          child: Column(
            children: [
              const AnimatedCabiano(),
              const SizedBox(height: 20),
              Text(
                'O que vamos conversar?',
                style: Theme.of(context).textTheme.headlineSmall?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 8),
              Text(
                'Toque em qualquer bloco para começar',
                style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      color: Colors.grey[600],
                    ),
              ),
              const SizedBox(height: 20),
              Expanded(
                child: ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: questionBlocks.length,
                  itemBuilder: (context, index) {
                    final blockKey = questionBlocks.keys.elementAt(index);
                    final block = questionBlocks[blockKey]!;
                    final isCompleted = controller.userData.answers.containsKey(blockKey);

                    return Card(
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      child: ListTile(
                        leading: Text(
                          block['icon'] as String,
                          style: const TextStyle(fontSize: 24),
                        ),
                        title: Text(block['title'] as String),
                        subtitle: Text('${(block['questions'] as List).length} perguntas'),
                        trailing: isCompleted
                            ? const Icon(LucideIcons.checkCircle2, color: Colors.green)
                            : const Icon(LucideIcons.chevronRight),
                        onTap: () {
                          Navigator.push(
                            context,
                            MaterialPageRoute(
                              builder: (context) => QuestionPage(
                                blockId: blockKey,
                                questions: block['questions'],
                              ),
                            ),
                          );
                        },
                      ),
                    );
                  },
                ),
              ),
              Padding(
                padding: const EdgeInsets.all(16.0),
                child: ProgressBarWidget(
                  current: controller.userData.answers.length,
                  total: questionBlocks.length,
                  section: 'Progresso Total',
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
