import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:myapp/app/modules/social_registration/controllers/social_registration_controller.dart';
import 'package:myapp/app/utils/routes/app_routes.dart';
import 'package:myapp/app/utils/themes/app_themes.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (context) => SocialRegistrationController(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Cadastro Social',
      theme: AppThemes.lightTheme,
      darkTheme: AppThemes.darkTheme,
      initialRoute: AppRoutes.adminDashboard,
      onGenerateRoute: AppRoutes.generateRoute,
    );
  }
}
