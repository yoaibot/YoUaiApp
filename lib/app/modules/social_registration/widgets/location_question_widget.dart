import 'package:flutter/material.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/services/location/location_service.dart';

class LocationQuestionWidget extends StatefulWidget {
  final Function(String) onLocationSaved;

  const LocationQuestionWidget({super.key, required this.onLocationSaved});

  @override
  _LocationQuestionWidgetState createState() => _LocationQuestionWidgetState();
}

class _LocationQuestionWidgetState extends State<LocationQuestionWidget> {
  final LocationService _locationService = LocationService();
  String? _location;
  bool _isLoading = false;

  void _getLocation() async {
    setState(() {
      _isLoading = true;
    });
    try {
      final position = await _locationService.getCurrentLocation();
      final locationString = '${position.latitude},${position.longitude}';
      setState(() {
        _location = locationString;
        _isLoading = false;
      });
      widget.onLocationSaved(locationString);
    } catch (e) {
      setState(() {
        _isLoading = false;
      });
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Erro ao obter localização: $e')),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (_isLoading)
          const CircularProgressIndicator()
        else if (_location != null)
          Text('Localização salva: $_location')
        else
          ElevatedButton.icon(
            onPressed: _getLocation,
            icon: const Icon(LucideIcons.mapPin),
            label: const Text('Usar minha localização'),
          ),
      ],
    );
  }
}
