import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/modules/social_registration/widgets/animated_cabiano_widget.dart';

class BlockCompletionPage extends StatelessWidget {
  final String blockTitle;

  const BlockCompletionPage({super.key, required this.blockTitle});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFFE8F5E9),
              Color(0xFFE3F2FD),
            ],
          ),
        ),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const AnimatedCabiano(),
              const SizedBox(height: 40),
              const Icon(
                LucideIcons.checkCircle,
                color: Colors.green,
                size: 80,
              ),
              const SizedBox(height: 20),
              Text(
                'Parabéns!',
                style: Theme.of(context).textTheme.headlineMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
              ),
              const SizedBox(height: 16),
              Text(
                'Você completou: $blockTitle',
                style: Theme.of(context).textTheme.titleLarge,
              ),
              const SizedBox(height: 40),
              ElevatedButton(
                onPressed: () {
                  Navigator.pop(context);
                },
                child: const Text('CONTINUAR'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
