import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:lucide_icons/lucide_icons.dart';
import 'package:myapp/app/services/camera/camera_service.dart';

class DocumentQuestionWidget extends StatefulWidget {
  final String docType;
  final Function(String) onImageSaved;

  const DocumentQuestionWidget({
    super.key,
    required this.docType,
    required this.onImageSaved,
  });

  @override
  _DocumentQuestionWidgetState createState() => _DocumentQuestionWidgetState();
}

class _DocumentQuestionWidgetState extends State<DocumentQuestionWidget> {
  final CameraService _cameraService = CameraService();
  XFile? _imageFile;

  void _takePicture() async {
    final imageFile = await _cameraService.takePicture();
    if (imageFile != null) {
      setState(() {
        _imageFile = imageFile;
      });
      widget.onImageSaved(imageFile.path);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        if (_imageFile != null)
          Image.asset(
            _imageFile!.path,
            height: 200,
          )
        else
          ElevatedButton.icon(
            onPressed: _takePicture,
            icon: const Icon(LucideIcons.camera),
            label: Text('Tirar foto do ${widget.docType}'),
          ),
      ],
    );
  }
}
