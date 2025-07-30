import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';

class AdminOverviewPage extends StatelessWidget {
  const AdminOverviewPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Visão Geral'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16.0),
        children: [
          _buildStatCard(
            title: 'Total de Atingidos',
            value: '1,247',
            icon: Icons.people,
            color: Colors.blue,
          ),
          const SizedBox(height: 16.0),
          _buildStatCard(
            title: 'Danos Materiais',
            value: '2,100',
            icon: Icons.home,
            color: Colors.red,
          ),
          const SizedBox(height: 16.0),
          _buildStatCard(
            title: 'Problemas de Saúde',
            value: '1,824',
            icon: Icons.healing,
            color: Colors.purple,
          ),
          const SizedBox(height: 16.0),
          _buildStatCard(
            title: 'Impacto Econômico',
            value: '1,368',
            icon: Icons.work,
            color: Colors.green,
          ),
          const SizedBox(height: 32.0),
          _buildBarChart(),
        ],
      ),
    );
  }

  Widget _buildStatCard({
    required String title,
    required String value,
    required IconData icon,
    required Color color,
  }) {
    return Card(
      elevation: 4.0,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10.0),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Row(
          children: [
            Icon(
              icon,
              size: 40.0,
              color: color,
            ),
            const SizedBox(width: 16.0),
            Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: const TextStyle(
                    fontSize: 16.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4.0),
                Text(
                  value,
                  style: const TextStyle(
                    fontSize: 24.0,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildBarChart() {
    return SizedBox(
      height: 300,
      child: BarChart(
        BarChartData(
          alignment: BarChartAlignment.spaceAround,
          maxY: 20,
          barTouchData: BarTouchData(
            enabled: false,
          ),
          titlesData: FlTitlesData(
            show: true,
            bottomTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: true,
                getTitlesWidget: (value, meta) {
                  const style = TextStyle(
                    color: Color(0xff7589a2),
                    fontWeight: FontWeight.bold,
                    fontSize: 14,
                  );
                  String text;
                  switch (value.toInt()) {
                    case 0:
                      text = 'Materiais';
                      break;
                    case 1:
                      text = 'Saúde';
                      break;
                    case 2:
                      text = 'Econômicos';
                      break;
                    default:
                      text = '';
                      break;
                  }
                  return SideTitleWidget(
                    axisSide: meta.axisSide,
                    space: 4.0,
                    child: Text(text, style: style),
                  );
                },
              ),
            ),
            leftTitles: AxisTitles(
              sideTitles: SideTitles(
                showTitles: false,
              ),
            ),
          ),
          borderData: FlBorderData(
            show: false,
          ),
          barGroups: [
            BarChartGroupData(
              x: 0,
              barRods: [
                BarChartRodData(
                  toY: 17,
                  color: Colors.red,
                  width: 22,
                )
              ],
            ),
            BarChartGroupData(
              x: 1,
              barRods: [
                BarChartRodData(
                  toY: 10,
                  color: Colors.purple,
                  width: 22,
                )
              ],
            ),
            BarChartGroupData(
              x: 2,
              barRods: [
                BarChartRodData(
                  toY: 14,
                  color: Colors.green,
                  width: 22,
                )
              ],
            ),
          ],
        ),
      ),
    );
  }
}
