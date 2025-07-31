import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/modules/social_registration/controllers/social_registration_controller.dart';
import 'package:myapp/app/modules/social_registration/pages/welcome_page.dart';
import 'package:myapp/app/modules/social_registration/widgets/animated_cabiano_widget.dart';
import 'package:provider/provider.dart';

class FinalSuccessPage extends StatelessWidget {
  const FinalSuccessPage({super.key});

  @override
  Widget build(BuildContext context) {
    final controller = Provider.of<SocialRegistrationController>(context);
    final userData = controller.userData.answers;

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
        child: Center(
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const AnimatedCabiano(),
                const SizedBox(height: 40),
                const Icon(
                  LucideIcons.partyPopper,
                  color: Colors.amber,
                  size: 80,
                ),
                const SizedBox(height: 20),
                Text(
                  'Cadastro Completo!',
                  style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                        fontWeight: FontWeight.bold,
                      ),
                ),
                const SizedBox(height: 16),
                Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Card(
                    child: Padding(
                      padding: const EdgeInsets.all(16.0),
                      child: Column(
                        children: [
                          Text(
                            'Resumo das Respostas',
                            style: Theme.of(context).textTheme.titleLarge,
                          ),
                          const SizedBox(height: 16),
                          ...userData.entries.map((entry) {
                            final blockId = entry.key;
                            final answers = entry.value;
                            return ExpansionTile(
                              title: Text(blockId),
                              children: answers.entries.map((answerEntry) {
                                return ListTile(
                                  title: Text(answerEntry.key),
                                  subtitle: Text(answerEntry.value.toString()),
                                );
                              }).toList(),
                            );
                          }),
                        ],
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 40),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    ElevatedButton(
                      onPressed: () {
                        // TODO: Implement print functionality
                      },
                      child: const Text('IMPRIMIR'),
                    ),
                    ElevatedButton(
                      onPressed: () {
                        Navigator.pushAndRemoveUntil(
                          context,
                          MaterialPageRoute(
                              builder: (context) => const WelcomePage()),
                          (route) => false,
                        );
                      },
                      child: const Text('INÍCIO'),
                    ),
                  ],
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
