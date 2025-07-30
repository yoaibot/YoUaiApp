import 'package:flutter/material.dart';
import 'package:myapp/app/modules/admin_dashboard/pages/admin_dashboard_page.dart';
import 'package:myapp/app/modules/social_registration/pages/welcome_page.dart';

class AppRoutes {
  static const String welcome = '/';
  static const String adminDashboard = '/admin';

  static Route<dynamic> generateRoute(RouteSettings settings) {
    switch (settings.name) {
      case welcome:
        return MaterialPageRoute(builder: (_) => const WelcomePage());
      case adminDashboard:
        return MaterialPageRoute(builder: (_) => const AdminDashboardPage());
      default:
        return MaterialPageRoute(
          builder: (_) => Scaffold(
            body: Center(
              child: Text('No route defined for ${settings.name}'),
            ),
          ),
        );
    }
  }
}
