import 'package:flutter/material.dart';
import 'package:myapp/app/models/question_model.dart';

final Map<String, Map<String, dynamic>> questionBlocks = {
  'basic': {
    'title': "Informações Básicas",
    'icon': "👤",
    'questions': [
      Question(id: 'uniqueId', text: 'Gerando seu código de identificação...', type: QuestionType.auto, required: true),
      Question(id: 'fullName', text: 'Qual é o seu nome completo?', type: QuestionType.voice, required: true),
      Question(id: 'birthDate', text: 'Qual é a sua data de nascimento?', type: QuestionType.date, required: true),
      Question(id: 'cpf', text: 'Qual é o seu número de CPF?', type: QuestionType.cpf, required: true),
      Question(id: 'cpfPhoto', text: 'Agora tire uma foto do seu CPF', type: QuestionType.document, docType: 'CPF', required: true),
      Question(id: 'rg', text: 'Qual é o seu número de RG?', type: QuestionType.text, required: true),
      Question(id: 'rgPhoto', text: 'Agora tire uma foto do seu RG', type: QuestionType.document, docType: 'RG', required: true),
      Question(
        id: 'maritalStatus',
        text: 'Qual seu estado civil?',
        type: QuestionType.selectColor,
        required: true,
        options: [
          QuestionOption(value: 'solteiro', label: 'Solteiro(a)', color: Colors.blue),
          QuestionOption(value: 'casado', label: 'Casado(a)', color: Colors.green),
          QuestionOption(value: 'divorciado', label: 'Divorciado(a)', color: Colors.yellow),
          QuestionOption(value: 'viuvo', label: 'Viúvo(a)', color: Colors.purple),
        ],
      ),
      Question(id: 'spouseName', text: 'Qual o nome completo do seu cônjuge?', type: QuestionType.voice, conditional: 'maritalStatus:casado'),
      Question(id: 'marriageDate', text: 'Qual a data do casamento?', type: QuestionType.date, conditional: 'maritalStatus:casado'),
      Question(id: 'phone', text: 'Qual é o seu telefone ou de alguém que possa falar por você?', type: QuestionType.phone, required: true),
      Question(id: 'currentAddress', text: 'Onde você mora hoje?', type: QuestionType.location, required: true),
      Question(id: 'sameAddressBefore', text: 'Você morava nesse mesmo lugar antes do rompimento?', type: QuestionType.yesnoColor, required: true),
    ],
  },
  'family': {
    'title': "Composição Familiar",
    'icon': "👨‍👩‍👧‍👦",
    'questions': [
      Question(id: 'familySizeBefore', text: 'Quantas pessoas moravam com você antes do rompimento?', type: QuestionType.number, required: true),
      Question(id: 'familySizeNow', text: 'Quantas pessoas moram com você hoje?', type: QuestionType.number, required: true),
      Question(
        id: 'familyRelations',
        text: 'Qual é o grau de parentesco dessas pessoas com você?',
        type: QuestionType.multiselectColor,
        required: true,
        options: [
          QuestionOption(value: 'Pai', label: 'Pai', color: Colors.blue),
          QuestionOption(value: 'Mãe', label: 'Mãe', color: Colors.pink),
          QuestionOption(value: 'Filho(a)', label: 'Filho(a)', color: Colors.green),
          QuestionOption(value: 'Irmão(ã)', label: 'Irmão(ã)', color: Colors.yellow),
          QuestionOption(value: 'Avô/Avó', label: 'Avô/Avó', color: Colors.purple),
          QuestionOption(value: 'Outros', label: 'Outros', color: Colors.grey),
        ],
      ),
      Question(id: 'familyLoss', text: 'Alguém da sua casa faleceu ou desapareceu por causa do rompimento?', type: QuestionType.yesnoColor, required: true),
    ],
  },
  // Add other blocks here...
};
