import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/modules/social_registration/pages/block_menu_page.dart';
import 'package:myapp/app/modules/social_registration/widgets/animated_cabiano_widget.dart';

class WelcomePage extends StatelessWidget {
  const WelcomePage({super.key});

  @override
  Widget build(BuildContext context) {
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
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const AnimatedCabiano(),
            const SizedBox(height: 40),
            Text(
              'Cadastro de Atingidos',
              style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
            const SizedBox(height: 16),
            Text(
              'Vamos registrar os danos que você sofreu',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: 8),
            Text(
              'Isso vai levar uns 15 minutinhos, tá?',
              style: Theme.of(context).textTheme.titleMedium?.copyWith(
                    color: Colors.grey[600],
                  ),
            ),
            const SizedBox(height: 40),
            ElevatedButton.icon(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const BlockMenuPage()),
                );
              },
              icon: const Icon(LucideIcons.play),
              label: const Text('COMEÇAR'),
              style: ElevatedButton.styleFrom(
                padding: const EdgeInsets.symmetric(
                  horizontal: 48,
                  vertical: 16,
                ),
                textStyle: const TextStyle(
                  fontSize: 20,
                  fontWeight: FontWeight.bold,
                ),
              ),
            ),
            const SizedBox(height: 20),
            TextButton.icon(
              onPressed: () {
                // TODO: Implement text-to-speech
              },
              icon: const Icon(LucideIcons.volume2),
              label: const Text('Ouvir novamente'),
            ),
          ],
        ),
      ),
    );
  }
}
