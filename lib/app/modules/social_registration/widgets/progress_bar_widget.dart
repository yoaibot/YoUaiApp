import 'package:flutter/material.dart';
import 'package:percent_indicator/linear_percent_indicator.dart';

class ProgressBarWidget extends StatelessWidget {
  final int current;
  final int total;
  final String? section;

  const ProgressBarWidget({
    super.key,
    required this.current,
    required this.total,
    this.section,
  });

  @override
  Widget build(BuildContext context) {
    final percentage = (current / total);

    return Column(
      children: [
        LinearPercentIndicator(
          lineHeight: 8.0,
          percent: percentage,
          backgroundColor: Colors.grey[300],
          progressColor: Colors.green,
        ),
        if (section != null)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 4.0),
            child: Text(
              section!,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    fontWeight: FontWeight.bold,
                  ),
            ),
          ),
      ],
    );
  }
}
