import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/modules/admin_dashboard/pages/admin_overview_page.dart';

class AdminDashboardPage extends StatefulWidget {
  const AdminDashboardPage({super.key});

  @override
  _AdminDashboardPageState createState() => _AdminDashboardPageState();
}

class _AdminDashboardPageState extends State<AdminDashboardPage> {
  int _selectedIndex = 0;

  static const List<Widget> _widgetOptions = <Widget>[
    AdminOverviewPage(),
    Text('Mapa'), // Placeholder for Map Page
    Text('Cadastros'), // Placeholder for Registrations Page
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Dashboard Administrativo'),
      ),
      body: Center(
        child: _widgetOptions.elementAt(_selectedIndex),
      ),
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(LucideIcons.home),
            label: 'Visão Geral',
          ),
          BottomNavigationBarItem(
            icon: Icon(LucideIcons.map),
            label: 'Mapa',
          ),
          BottomNavigationBarItem(
            icon: Icon(LucideIcons.users),
            label: 'Cadastros',
          ),
        ],
        currentIndex: _selectedIndex,
        onTap: _onItemTapped,
      ),
    );
  }
}
