import React, { useState, useEffect, useRef } from 'react';
import { Camera, Mic, MapPin, Users, Check, ChevronLeft, Volume2, Home, Award, Heart, Briefcase, FileText, HelpCircle, ChevronRight, Phone, Calendar, AlertCircle, Package, HeartHandshake, Upload, CreditCard, MapPinned, Play } from 'lucide-react';

// Simulação de API de voz
const speak = (text, rate = 1, onEnd = null) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = rate;
    utterance.pitch = 1.1;
    utterance.volume = 1;
    if (onEnd) {
      utterance.onend = onEnd;
    }
    speechSynthesis.speak(utterance);
  }
};

// Hook para reconhecimento de voz
const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setTranscript(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.start();
      setIsListening(true);
    }
  };
  
  return { transcript, isListening, startListening };
};

// Componente do Cabiano Animado
const AnimatedCabiano = ({ emotion = 'happy', speaking = false, action = 'idle' }) => {
  const [frame, setFrame] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);
  
  const getAnimation = () => {
    if (action === 'pointing') {
      return 'translate-x-1';
    }
    if (action === 'celebrating') {
      return 'rotate-6 scale-110';
    }
    if (speaking) {
      return 'scale-105';
    }
    return '';
  };
  
  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${getAnimation()}`}>
      <div className="relative">
        {/* Corpo do Cabiano */}
        <div className="bg-blue-500 rounded-full w-24 h-24 relative overflow-hidden shadow-xl">
          {/* Rosto */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Olhos */}
            <div className="absolute top-6 left-6 w-2 h-2 bg-white rounded-full">
              <div className={`absolute inset-0 bg-black rounded-full scale-50 ${frame % 4 === 0 ? 'scale-y-0' : ''} transition-all`} />
            </div>
            <div className="absolute top-6 right-6 w-2 h-2 bg-white rounded-full">
              <div className={`absolute inset-0 bg-black rounded-full scale-50 ${frame % 4 === 0 ? 'scale-y-0' : ''} transition-all`} />
            </div>
            
            {/* Boca */}
            <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${
              speaking ? 'w-8 h-8' : 'w-6 h-2'
            } bg-white rounded-full transition-all duration-200`} />
          </div>
          
          {/* Chapéu */}
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-yellow-600 rounded-t-full" />
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-24 h-2 bg-yellow-700" />
        </div>
        
        {/* Braços */}
        {action === 'pointing' && (
          <div className={`absolute top-10 -left-8 w-8 h-2 bg-blue-400 rounded-full transform rotate-45 ${
            frame % 2 === 0 ? 'translate-y-1' : ''
          } transition-all`} />
        )}
        
        {/* Indicador de fala */}
        {speaking && (
          <div className="absolute -bottom-2 right-0 bg-green-500 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
            <Volume2 className="w-3 h-3 animate-pulse" />
            <span>Falando...</span>
          </div>
        )}
      </div>
    </div>
  );
};

// Componente de Progresso
const ProgressBar = ({ current, total, section = '' }) => {
  const percentage = (current / total) * 100;
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-100 z-40">
      <div className="h-2 bg-gray-200">
        <div 
          className="h-full bg-green-500 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {section && (
        <div className="text-center py-1 text-sm font-medium text-gray-700">
          {section}
        </div>
      )}
    </div>
  );
};

// Função para gerar ID único
const generateUniqueId = () => {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `BRU${timestamp}${randomStr}`.toUpperCase();
};

// Dados estruturados das perguntas atualizados
const questionBlocks = {
  basic: {
    title: "Informações Básicas",
    icon: "👤",
    questions: [
      { id: 'uniqueId', text: 'Gerando seu código de identificação...', type: 'auto', required: true },
      { id: 'fullName', text: 'Qual é o seu nome completo?', type: 'voice', required: true },
      { id: 'birthDate', text: 'Qual é a sua data de nascimento?', type: 'date', required: true },
      { id: 'cpf', text: 'Qual é o seu número de CPF?', type: 'cpf', required: true },
      { id: 'cpfPhoto', text: 'Agora tire uma foto do seu CPF', type: 'document', docType: 'CPF', required: true },
      { id: 'rg', text: 'Qual é o seu número de RG?', type: 'text', required: true },
      { id: 'rgPhoto', text: 'Agora tire uma foto do seu RG', type: 'document', docType: 'RG', required: true },
      { id: 'maritalStatus', text: 'Qual seu estado civil?', type: 'select-color', options: [
        { value: 'solteiro', label: 'Solteiro(a)', color: 'blue' },
        { value: 'casado', label: 'Casado(a)', color: 'green' },
        { value: 'divorciado', label: 'Divorciado(a)', color: 'yellow' },
        { value: 'viuvo', label: 'Viúvo(a)', color: 'purple' }
      ], required: true },
      { id: 'spouseName', text: 'Qual o nome completo do seu cônjuge?', type: 'voice', conditional: 'maritalStatus:casado' },
      { id: 'marriageDate', text: 'Qual a data do casamento?', type: 'date', conditional: 'maritalStatus:casado' },
      { id: 'phone', text: 'Qual é o seu telefone ou de alguém que possa falar por você?', type: 'phone', required: true },
      { id: 'currentAddress', text: 'Onde você mora hoje?', type: 'location', required: true },
      { id: 'sameAddressBefore', text: 'Você morava nesse mesmo lugar antes do rompimento?', type: 'yesno-color', required: true }
    ]
  },
  family: {
    title: "Composição Familiar",
    icon: "👨‍👩‍👧‍👦",
    questions: [
      { id: 'familySizeBefore', text: 'Quantas pessoas moravam com você antes do rompimento?', type: 'number', required: true },
      { id: 'familySizeNow', text: 'Quantas pessoas moram com você hoje?', type: 'number', required: true },
      { id: 'familyRelations', text: 'Qual é o grau de parentesco dessas pessoas com você?', type: 'multiselect-color', options: [
        { value: 'Pai', label: 'Pai', color: 'blue' },
        { value: 'Mãe', label: 'Mãe', color: 'pink' },
        { value: 'Filho(a)', label: 'Filho(a)', color: 'green' },
        { value: 'Irmão(ã)', label: 'Irmão(ã)', color: 'yellow' },
        { value: 'Avô/Avó', label: 'Avô/Avó', color: 'purple' },
        { value: 'Outros', label: 'Outros', color: 'gray' }
      ], required: true },
      { id: 'familyLoss', text: 'Alguém da sua casa faleceu ou desapareceu por causa do rompimento?', type: 'yesno-color', required: true }
    ]
  },
  material: {
    title: "Danos Materiais",
    icon: "🏠",
    questions: [
      { id: 'homeLoss', text: 'Você perdeu a sua casa ou parte dela?', type: 'yesno-color', required: true },
      { id: 'furnitureLoss', text: 'Seus móveis foram danificados ou perdidos?', type: 'yesno-color', required: true },
      { id: 'vehicleLoss', text: 'Perdeu carro, moto ou outro veículo?', type: 'yesno-color', required: true },
      { id: 'workEquipmentLoss', text: 'Perdeu equipamentos de trabalho como ferramentas ou trator?', type: 'yesno-color', required: true },
      { id: 'forcedMove', text: 'Você precisou se mudar por causa do rompimento?', type: 'yesno-color', required: true }
    ]
  },
  health: {
    title: "Danos à Saúde",
    icon: "🏥",
    questions: [
      { id: 'healthProblems', text: 'Você teve algum problema de saúde por causa do rompimento?', type: 'yesno-color', required: true },
      { id: 'healthType', text: 'Que tipo de problema você teve?', type: 'multiselect-color', options: [
        { value: 'Físico', label: 'Físico', color: 'red' },
        { value: 'Respiratório', label: 'Respiratório', color: 'blue' },
        { value: 'Emocional', label: 'Emocional', color: 'purple' },
        { value: 'Outros', label: 'Outros', color: 'gray' }
      ], conditional: 'healthProblems:sim' },
      { id: 'treatment', text: 'Você está tomando algum remédio ou fazendo tratamento por causa disso?', type: 'yesno-color', conditional: 'healthProblems:sim' },
      { id: 'familyHealth', text: 'Alguém da sua família passou por isso também?', type: 'yesno-color', required: true }
    ]
  },
  emotional: {
    title: "Danos Emocionais",
    icon: "💔",
    questions: [
      { id: 'emotionalImpact', text: 'Você sente tristeza, medo ou ansiedade por causa do que aconteceu?', type: 'yesno-color', required: true },
      { id: 'dailyImpact', text: 'Teve dificuldade para dormir ou trabalhar depois do rompimento?', type: 'yesno-color', required: true },
      { id: 'psychologicalHelp', text: 'Já procurou ajuda psicológica?', type: 'yesno-color', required: true }
    ]
  },
  economic: {
    title: "Danos Econômicos",
    icon: "💰",
    questions: [
      { id: 'jobLoss', text: 'Você perdeu seu trabalho ou renda por causa do rompimento?', type: 'yesno-color', required: true },
      { id: 'previousIncome', text: 'Qual era sua principal fonte de renda antes do desastre?', type: 'select-color', options: [
        { value: 'Emprego formal', label: 'Emprego formal', color: 'blue' },
        { value: 'Trabalho informal', label: 'Trabalho informal', color: 'green' },
        { value: 'Agricultura', label: 'Agricultura', color: 'yellow' },
        { value: 'Pecuária', label: 'Pecuária', color: 'orange' },
        { value: 'Comércio', label: 'Comércio', color: 'purple' },
        { value: 'Aposentadoria', label: 'Aposentadoria', color: 'gray' },
        { value: 'Outros', label: 'Outros', color: 'pink' }
      ], required: true },
      { id: 'currentWork', text: 'Você ainda consegue trabalhar?', type: 'yesno-color', required: true },
      { id: 'productionLoss', text: 'Perdeu lavoura, gado ou algum tipo de produção?', type: 'yesno-color', required: true }
    ]
  },
  assistance: {
    title: "Ajuda Recebida",
    icon: "🤝",
    questions: [
      { id: 'compensation', text: 'Você recebeu algum auxílio ou indenização?', type: 'yesno-color', required: true },
      { id: 'governmentProgram', text: 'Participa de algum programa de renda ou cadastro do governo?', type: 'yesno-color', required: true },
      { id: 'ngoHelp', text: 'Recebeu ajuda de alguma ONG, igreja ou entidade?', type: 'yesno-color', required: true }
    ]
  },
  documents: {
    title: "Documentos e Provas",
    icon: "📄",
    questions: [
      { id: 'hasEvidence', text: 'Você tem fotos ou documentos que provem os danos sofridos?', type: 'yesno-color', required: true },
      { id: 'evidenceUpload', text: 'Por favor, envie as fotos dos danos', type: 'document', docType: 'evidence', conditional: 'hasEvidence:sim', multiple: true },
      { id: 'hasWitness', text: 'Tem alguém que possa confirmar sua história como testemunha?', type: 'yesno-color', required: true },
      { id: 'authorize', text: 'Autoriza que a gente use essas informações para buscar reparação?', type: 'yesno-color', required: true }
    ]
  },
  additional: {
    title: "Outras Informações",
    icon: "💬",
    questions: [
      { id: 'additionalInfo', text: 'Tem mais alguma coisa que você acha importante contar?', type: 'voice', required: false },
      { id: 'contactPreference', text: 'Como você gostaria de ser informado sobre os próximos passos?', type: 'select-color', options: [
        { value: 'Ligação telefônica', label: 'Ligação telefônica', color: 'blue' },
        { value: 'Mensagem WhatsApp', label: 'Mensagem WhatsApp', color: 'green' },
        { value: 'Visita presencial', label: 'Visita presencial', color: 'yellow' },
        { value: 'E-mail', label: 'E-mail', color: 'purple' }
      ], required: true }
    ]
  }
};

// Componente de Botão de Audio Individual
const AudioButton = ({ text, color = 'blue' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const playAudio = () => {
    setIsPlaying(true);
    speak(text, 1, () => setIsPlaying(false));
  };
  
  return (
    <button
      onClick={playAudio}
      className={`p-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-gray-300'} hover:bg-green-400 transition-all`}
    >
      <Volume2 className={`w-4 h-4 ${isPlaying ? 'text-white animate-pulse' : 'text-gray-700'}`} />
    </button>
  );
};

// Tela de Boas-Vindas
const WelcomeScreen = ({ onNext }) => {
  useEffect(() => {
    speak("Oi, sô! Eu sou o Cabiano. Tô aqui pra te ajudar a registrar tudo que ocê passou. Vou te guiar passo a passo, tá bom? Vamo começar? É só apertar o botão verde!");
  }, []);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4">
      <AnimatedCabiano emotion="happy" speaking={true} action="idle" />
      
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Cadastro de Atingidos</h1>
        <p className="text-xl text-gray-600">Vamos registrar os danos que você sofreu</p>
        <p className="text-lg text-gray-500 mt-2">Isso vai levar uns 15 minutinhos, tá?</p>
      </div>
      
      <button
        onClick={onNext}
        className="bg-green-500 text-white text-2xl font-bold py-8 px-16 rounded-2xl shadow-lg hover:bg-green-600 transition-all transform hover:scale-105 flex items-center gap-4"
      >
        <span>COMEÇAR</span>
        <div className="bg-white/30 p-2 rounded-full">
          ▶️
        </div>
      </button>
      
      <button 
        onClick={() => speak("Aperte o botão verde para começar! Vou te ajudar em cada passo.")}
        className="mt-8 text-blue-600 flex items-center gap-2 text-lg"
      >
        <Volume2 className="w-6 h-6" /> 
        <span>Ouvir novamente</span>
      </button>
    </div>
  );
};

// Componente de Menu de Blocos
const BlockMenu = ({ blocks, completedBlocks, currentBlock, onSelectBlock }) => {
  useEffect(() => {
    speak("Escolha qual parte você quer responder agora. Pode fazer na ordem que preferir!");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 p-4">
      <AnimatedCabiano emotion="explaining" action="pointing" />
      
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">O que vamos conversar?</h2>
        <p className="text-center text-gray-600 mb-8">Toque em qualquer bloco para começar</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(blocks).map(([key, block]) => {
            const isCompleted = completedBlocks.includes(key);
            const isCurrent = currentBlock === key;
            
            return (
              <button
                key={key}
                onClick={() => onSelectBlock(key)}
                className={`p-6 rounded-2xl shadow-lg transition-all transform hover:scale-105 ${
                  isCompleted 
                    ? 'bg-green-100 border-2 border-green-500' 
                    : isCurrent
                    ? 'bg-blue-100 border-2 border-blue-500'
                    : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-4xl">{block.icon}</span>
                  {isCompleted && <Check className="w-8 h-8 text-green-500" />}
                </div>
                <h3 className="text-xl font-bold text-left">{block.title}</h3>
                <p className="text-sm text-gray-600 text-left mt-1">
                  {block.questions.length} perguntas
                </p>
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 bg-white p-4 rounded-xl shadow">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">Progresso Total:</span>
            <span className="text-2xl font-bold text-green-600">
              {completedBlocks.length}/{Object.keys(blocks).length} blocos
            </span>
          </div>
          <div className="mt-2 h-4 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${(completedBlocks.length / Object.keys(blocks).length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente de Pergunta Individual Melhorado
const QuestionScreen = ({ question, value, onChange, onNext, onBack, blockTitle, questionIndex, totalQuestions }) => {
  const { transcript, isListening, startListening } = useSpeechRecognition();
  const [localValue, setLocalValue] = useState(value || '');
  const [showLocationHelp, setShowLocationHelp] = useState(false);
  const [showDocumentHelp, setShowDocumentHelp] = useState(false);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    // Auto gerar ID único
    if (question.type === 'auto' && !localValue) {
      const uniqueId = generateUniqueId();
      setLocalValue(uniqueId);
      speak(`Seu código de identificação é: ${uniqueId}. Vou guardar isso pra você!`);
      setTimeout(() => {
        onChange(uniqueId);
        onNext();
      }, 3000);
      return;
    }
    
    // Ler a pergunta principal
    speak(question.text + (question.subtext ? ` ${question.subtext}` : ''));
    
    // Ler as opções se for múltipla escolha
    if (question.type === 'select-color' || question.type === 'multiselect-color') {
      setTimeout(() => {
        speak("As opções são:");
        question.options.forEach((option, index) => {
          setTimeout(() => {
            speak(`${index + 1}: ${option.label}`);
          }, (index + 1) * 1500);
        });
      }, 2000);
    }
  }, [question]);
  
  useEffect(() => {
    if (transcript && (question.type === 'voice' || question.type === 'text')) {
      setLocalValue(transcript);
    }
  }, [transcript, question.type]);
  
  const handleNext = () => {
    // Validação de localização obrigatória
    if (question.type === 'location' && !localValue) {
      speak("A localização é obrigatória. Por favor, clique no botão para usar sua localização atual.");
      return;
    }
    
    onChange(localValue);
    onNext();
  };
  
  const getColorClass = (color) => {
    const colors = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
      red: 'bg-red-500 hover:bg-red-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
      pink: 'bg-pink-500 hover:bg-pink-600',
      orange: 'bg-orange-500 hover:bg-orange-600',
      gray: 'bg-gray-500 hover:bg-gray-600'
    };
    return colors[color] || colors.blue;
  };
  
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalValue(reader.result);
        speak("Documento recebido com sucesso!");
      };
      reader.readAsDataURL(file);
    }
  };
  
  const renderInput = () => {
    switch (question.type) {
      case 'auto':
        return (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <p className="text-3xl font-bold text-center text-blue-600">{localValue}</p>
            <p className="text-center text-gray-600 mt-2">Guardando seu código...</p>
          </div>
        );
        
      case 'voice':
      case 'text':
        return (
          <div className="space-y-4">
            <div className={`p-4 rounded-2xl mb-4 ${isListening ? 'animate-pulse bg-red-100' : ''}`}>
              <Mic className={`w-24 h-24 mx-auto ${isListening ? 'text-red-500' : 'text-gray-400'}`} />
            </div>
            
            {localValue && (
              <div className="bg-white p-6 rounded-2xl shadow-lg mb-4">
                <p className="text-xl text-center">{localValue}</p>
              </div>
            )}
            
            <button
              onClick={startListening}
              disabled={isListening}
              className={`w-full ${isListening ? 'bg-red-500' : 'bg-blue-500'} text-white text-xl font-bold py-6 px-8 rounded-2xl shadow-lg`}
            >
              <Mic className="w-6 h-6 inline mr-2" />
              {isListening ? 'OUVINDO...' : 'FALAR RESPOSTA'}
            </button>
            
            <div className="mt-4">
              <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder="Ou digite aqui"
                className="w-full text-center text-xl p-4 rounded-xl border-2 border-gray-300"
              />
            </div>
          </div>
        );
        
      case 'yesno-color':
        return (
          <div className="grid grid-cols-2 gap-6">
            <div className="relative">
              <button
                onClick={() => {
                  setLocalValue('sim');
                  speak("Você escolheu SIM");
                }}
                className={`w-full p-8 rounded-2xl text-2xl font-bold transition-all text-white ${
                  localValue === 'sim' 
                    ? 'bg-green-600 transform scale-105 ring-4 ring-green-300' 
                    : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                <Check className="w-12 h-12 mx-auto mb-2" />
                SIM
              </button>
              <AudioButton text="SIM" color="green" />
            </div>
            
            <div className="relative">
              <button
                onClick={() => {
                  setLocalValue('não');
                  speak("Você escolheu NÃO");
                }}
                className={`w-full p-8 rounded-2xl text-2xl font-bold transition-all text-white ${
                  localValue === 'não' 
                    ? 'bg-red-600 transform scale-105 ring-4 ring-red-300' 
                    : 'bg-red-500 hover:bg-red-600'
                }`}
              >
                <span className="text-4xl block mb-2">✗</span>
                NÃO
              </button>
              <AudioButton text="NÃO" color="red" />
            </div>
          </div>
        );
        
      case 'select-color':
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <div key={option.value} className="relative">
                <button
                  onClick={() => {
                    setLocalValue(option.value);
                    speak(`Você escolheu: ${option.label}`);
                  }}
                  className={`w-full p-6 rounded-2xl text-xl font-bold transition-all text-white flex items-center justify-between ${
                    localValue === option.value
                      ? `${getColorClass(option.color)} transform scale-105 ring-4 ring-${option.color}-300`
                      : getColorClass(option.color)
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="bg-white/20 px-3 py-1 rounded-full">{index + 1}</span>
                    {option.label}
                  </span>
                  {localValue === option.value && <Check className="w-6 h-6" />}
                </button>
                <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                  <AudioButton text={`Opção ${index + 1}: ${option.label}`} />
                </div>
              </div>
            ))}
          </div>
        );
        
      case 'multiselect-color':
        const selectedValues = localValue ? localValue.split(',') : [];
        return (
          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedValues.includes(option.value);
              return (
                <div key={option.value} className="relative">
                  <button
                    onClick={() => {
                      let newValues;
                      if (isSelected) {
                        newValues = selectedValues.filter(v => v !== option.value);
                        speak(`${option.label} desmarcado`);
                      } else {
                        newValues = [...selectedValues, option.value];
                        speak(`${option.label} marcado`);
                      }
                      setLocalValue(newValues.join(','));
                    }}
                    className={`w-full p-6 rounded-2xl text-xl font-bold transition-all text-white flex items-center justify-between ${
                      isSelected
                        ? `${getColorClass(option.color)} transform scale-105 ring-4 ring-${option.color}-300`
                        : `${getColorClass(option.color)} opacity-70`
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="bg-white/20 px-3 py-1 rounded-full">{index + 1}</span>
                      {option.label}
                    </span>
                    {isSelected && <Check className="w-6 h-6" />}
                  </button>
                  <div className="absolute -right-12 top-1/2 transform -translate-y-1/2">
                    <AudioButton text={`Opção ${index + 1}: ${option.label}`} />
                  </div>
                </div>
              );
            })}
            <p className="text-center text-gray-600 mt-4">Você pode escolher várias opções</p>
          </div>
        );
        
      case 'location':
        return (
          <div className="space-y-4">
            {!localValue && (
              <div className="bg-yellow-100 border-2 border-yellow-400 rounded-xl p-4 mb-4">
                <p className="text-yellow-800 font-medium flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Localização é obrigatória
                </p>
              </div>
            )}
            
            <button
              onClick={() => {
                speak("Vou pegar sua localização atual. Por favor, autorize quando aparecer a mensagem.");
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const location = `${position.coords.latitude},${position.coords.longitude}`;
                    setLocalValue(location);
                    speak("Localização encontrada com sucesso!");
                  },
                  () => {
                    speak("Não consegui pegar sua localização. Vamos tentar de novo?");
                    setShowLocationHelp(true);
                  }
                );
              }}
              className="w-full bg-blue-500 text-white text-xl font-bold py-6 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:bg-blue-600"
            >
              <MapPin className="w-8 h-8" />
              USAR MINHA LOCALIZAÇÃO
            </button>
            
            {localValue && (
              <div className="bg-green-100 p-4 rounded-xl">
                <p className="text-green-800 font-medium flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  Localização salva!
                </p>
              </div>
            )}
            
            <button
              onClick={() => setShowLocationHelp(true)}
              className="text-blue-600 underline text-center w-full"
            >
              Preciso de ajuda
            </button>
            
            {showLocationHelp && (
              <div className="bg-blue-50 p-4 rounded-xl">
                <p className="text-sm text-blue-800 mb-2">Para ativar a localização:</p>
                <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1">
                  <li>Quando aparecer a mensagem, clique em "Permitir"</li>
                  <li>Se não aparecer, verifique se o GPS está ligado</li>
                  <li>Tente novamente clicando no botão azul</li>
                </ol>
              </div>
            )}
          </div>
        );
        
      case 'document':
        return (
          <div className="space-y-4">
            <AnimatedCabiano emotion="explaining" action="pointing" speaking={true} />
            
            {!localValue ? (
              <>
                <div className="bg-blue-50 p-6 rounded-2xl text-center">
                  <Camera className="w-16 h-16 mx-auto text-blue-500 mb-4" />
                  <p className="text-lg font-medium mb-2">Vamos tirar uma foto do seu {question.docType}</p>
                  <button
                    onClick={() => setShowDocumentHelp(true)}
                    className="text-blue-600 underline"
                  >
                    Como faço isso?
                  </button>
                </div>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileUpload}
                  className="hidden"
                  multiple={question.multiple}
                />
                
                <button
                  onClick={() => {
                    speak(`Clique para tirar a foto do ${question.docType}. Segure o documento bem iluminado.`);
                    fileInputRef.current?.click();
                  }}
                  className="w-full bg-green-500 text-white text-xl font-bold py-6 px-8 rounded-2xl shadow-lg flex items-center justify-center gap-3 hover:bg-green-600"
                >
                  <Camera className="w-8 h-8" />
                  TIRAR FOTO DO {question.docType}
                </button>
                
                {showDocumentHelp && (
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <p className="text-sm font-medium text-yellow-800 mb-2">Dicas para uma boa foto:</p>
                    <ul className="text-sm text-yellow-700 list-disc list-inside space-y-1">
                      <li>Coloque o documento em lugar bem iluminado</li>
                      <li>Evite sombras sobre o documento</li>
                      <li>Mantenha o celular parado</li>
                      <li>Centralize o documento na tela</li>
                      <li>Certifique-se que está legível</li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-green-100 p-6 rounded-2xl">
                <Check className="w-16 h-16 mx-auto text-green-600 mb-4" />
                <p className="text-center text-green-800 font-medium">
                  Foto do {question.docType} recebida com sucesso!
                </p>
                <button
                  onClick={() => {
                    setLocalValue('');
                    speak("Vamos tirar a foto novamente");
                  }}
                  className="mt-4 text-blue-600 underline text-center w-full"
                >
                  Tirar outra foto
                </button>
              </div>
            )}
          </div>
        );
        
      case 'number':
        return (
          <div>
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-6">
              <p className="text-5xl font-bold text-center">{localValue || '0'}</p>
            </div>
            <div className="flex items-center justify-center gap-8">
              <button
                onClick={() => {
                  const newValue = Math.max(0, (parseInt(localValue) || 0) - 1);
                  setLocalValue(newValue.toString());
                  speak(newValue.toString());
                }}
                className="bg-red-500 text-white text-3xl font-bold w-20 h-20 rounded-full shadow-lg hover:bg-red-600"
              >
                -
              </button>
              <Users className="w-12 h-12 text-gray-400" />
              <button
                onClick={() => {
                  const newValue = (parseInt(localValue) || 0) + 1;
                  setLocalValue(newValue.toString());
                  speak(newValue.toString());
                }}
                className="bg-green-500 text-white text-3xl font-bold w-20 h-20 rounded-full shadow-lg hover:bg-green-600"
              >
                +
              </button>
            </div>
          </div>
        );
        
      case 'date':
        return (
          <div className="space-y-4">
            <input
              type="date"
              value={localValue}
              onChange={(e) => setLocalValue(e.target.value)}
              className="w-full text-2xl p-6 rounded-2xl border-2 border-gray-300 text-center"
              max={new Date().toISOString().split('T')[0]}
            />
            <p className="text-gray-600 text-center">Use o calendário acima</p>
          </div>
        );
        
      case 'phone':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <input
                type="tel"
                value={localValue}
                onChange={(e) => {
                  const numbers = e.target.value.replace(/\D/g, '');
                  if (numbers.length <= 11) {
                    const formatted = numbers
                      .replace(/(\d{2})(\d)/, '($1) $2')
                      .replace(/(\d{5})(\d)/, '$1-$2');
                    setLocalValue(formatted);
                  }
                }}
                placeholder="(00) 00000-0000"
                className="w-full text-2xl font-mono text-center outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6,7,8,9,'←',0,'✓'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === '←') {
                      setLocalValue(localValue.slice(0, -1));
                    } else if (key === '✓') {
                      handleNext();
                    } else {
                      const numbers = localValue.replace(/\D/g, '') + key;
                      if (numbers.length <= 11) {
                        const formatted = numbers
                          .replace(/(\d{2})(\d)/, '($1) $2')
                          .replace(/(\d{5})(\d)/, '$1-$2');
                        setLocalValue(formatted);
                      }
                    }
                  }}
                  className={`${
                    key === '✓' 
                      ? 'bg-green-500 text-white' 
                      : key === '←'
                      ? 'bg-red-500 text-white'
                      : 'bg-white'
                  } text-2xl font-bold h-20 rounded-2xl shadow-lg hover:opacity-80`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        );
        
      case 'cpf':
        return (
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <input
                type="text"
                value={localValue}
                onChange={(e) => {
                  const numbers = e.target.value.replace(/\D/g, '');
                  if (numbers.length <= 11) {
                    const formatted = numbers
                      .replace(/(\d{3})(\d)/, '$1.$2')
                      .replace(/(\d{3})(\d)/, '$1.$2')
                      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
                    setLocalValue(formatted);
                  }
                }}
                placeholder="000.000.000-00"
                className="w-full text-2xl font-mono text-center outline-none"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[1,2,3,4,5,6,7,8,9,'←',0,'✓'].map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    if (key === '←') {
                      setLocalValue(localValue.slice(0, -1));
                    } else if (key === '✓') {
                      handleNext();
                    } else {
                      const numbers = localValue.replace(/\D/g, '') + key;
                      if (numbers.length <= 11) {
                        const formatted = numbers
                          .replace(/(\d{3})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d)/, '$1.$2')
                          .replace(/(\d{3})(\d{1,2})/, '$1-$2');
                        setLocalValue(formatted);
                      }
                    }
                  }}
                  className={`${
                    key === '✓' 
                      ? 'bg-green-500 text-white' 
                      : key === '←'
                      ? 'bg-red-500 text-white'
                      : 'bg-white'
                  } text-2xl font-bold h-20 rounded-2xl shadow-lg hover:opacity-80`}
                >
                  {key}
                </button>
              ))}
            </div>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col p-4">
      <AnimatedCabiano 
        emotion={question.type === 'yesno-color' ? 'thinking' : 'explaining'} 
        action={question.type === 'document' ? 'pointing' : 'idle'}
      />
      <ProgressBar 
        current={questionIndex + 1} 
        total={totalQuestions} 
        section={blockTitle}
      />
      
      <button onClick={onBack} className="absolute top-16 left-4 p-2 bg-white rounded-full shadow-lg">
        <ChevronLeft className="w-6 h-6" />
      </button>
      
      <div className="flex-grow flex flex-col justify-center max-w-2xl mx-auto w-full">
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{question.text}</h3>
          {question.subtext && (
            <p className="text-lg text-gray-600">{question.subtext}</p>
          )}
        </div>
        
        {renderInput()}
        
        <div className="mt-8 flex justify-between items-center">
          <button 
            onClick={() => speak(question.text + (question.subtext ? ` ${question.subtext}` : ''))}
            className="text-blue-600 flex items-center gap-2 text-lg"
          >
            <Volume2 className="w-6 h-6" /> 
            <span>Ouvir pergunta</span>
          </button>
          
          {(localValue || question.type === 'voice' || question.type === 'text') && question.type !== 'auto' && (
            <button
              onClick={handleNext}
              className="bg-green-500 text-white text-xl font-bold py-4 px-8 rounded-2xl shadow-lg hover:bg-green-600 transition-all flex items-center gap-2"
            >
              PRÓXIMA
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Tela de Conclusão de Bloco
const BlockCompletionScreen = ({ blockTitle, onContinue }) => {
  useEffect(() => {
    speak(`Muito bem! Você completou a parte sobre ${blockTitle}. Vamos continuar?`);
  }, [blockTitle]);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 flex flex-col items-center justify-center p-4">
      <AnimatedCabiano emotion="celebrating" speaking={true} action="celebrating" />
      
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center mb-8">
        <Check className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-2">Parabéns!</h2>
        <p className="text-xl text-gray-600">
          Você completou: <strong>{blockTitle}</strong>
        </p>
      </div>
      
      <button
        onClick={onContinue}
        className="bg-blue-500 text-white text-xl font-bold py-6 px-12 rounded-2xl shadow-lg hover:bg-blue-600 transition-all"
      >
        CONTINUAR
      </button>
    </div>
  );
};

// Tela Final de Sucesso
const FinalSuccessScreen = ({ userData, onRestart }) => {
  const [showDetails, setShowDetails] = useState(false);
  const uniqueId = userData.basic?.uniqueId || 'N/A';
  
  useEffect(() => {
    speak(`Parabéns! Você completou todo o cadastro. Seu código de identificação é ${uniqueId}. Guarde esse código! Agora vamos usar essas informações pra buscar seus direitos.`);
  }, [uniqueId]);
  
  const calculateCompletionStats = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    Object.entries(questionBlocks).forEach(([blockKey, block]) => {
      block.questions.forEach(question => {
        totalQuestions++;
        if (userData[blockKey]?.[question.id]) {
          answeredQuestions++;
        }
      });
    });
    
    return { totalQuestions, answeredQuestions };
  };
  
  const stats = calculateCompletionStats();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <AnimatedCabiano emotion="celebrating" action="celebrating" />
      
      {/* Confetti Animation */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {['🎉', '🎊', '✨', '🌟', '💚'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-lg mb-8 text-center max-w-2xl">
        <Award className="w-24 h-24 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Cadastro Completo!</h2>
        
        <div className="bg-blue-100 p-6 rounded-xl mb-6">
          <p className="text-lg text-gray-700 mb-2">Seu código de identificação:</p>
          <p className="text-3xl font-bold text-blue-800 font-mono">{uniqueId}</p>
          <p className="text-sm text-gray-600 mt-2">Guarde esse código!</p>
        </div>
        
        <div className="bg-green-100 p-6 rounded-xl mb-6">
          <p className="text-2xl font-bold text-green-800">
            {stats.answeredQuestions} de {stats.totalQuestions} perguntas respondidas
          </p>
          <div className="mt-2 h-4 bg-green-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-600 transition-all duration-1000"
              style={{ width: `${(stats.answeredQuestions / stats.totalQuestions) * 100}%` }}
            />
          </div>
        </div>
        
        <p className="text-lg text-gray-600 mb-6">
          Suas informações foram salvas com segurança e serão usadas para buscar a reparação que você merece.
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full bg-gray-100 text-gray-800 text-lg font-medium py-4 px-6 rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
          >
            <FileText className="w-5 h-5" />
            {showDetails ? 'Ocultar' : 'Ver'} Resumo das Respostas
          </button>
          
          {showDetails && (
            <div className="text-left bg-gray-50 p-6 rounded-xl max-h-96 overflow-y-auto">
              {Object.entries(questionBlocks).map(([blockKey, block]) => (
                <div key={blockKey} className="mb-6">
                  <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <span>{block.icon}</span> {block.title}
                  </h4>
                  <ul className="space-y-1">
                    {block.questions.map(question => {
                      const answer = userData[blockKey]?.[question.id];
                      if (answer && question.type !== 'document') {
                        return (
                          <li key={question.id} className="text-sm">
                            <strong>{question.text}:</strong> {answer}
                          </li>
                        );
                      }
                      return null;
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              onClick={() => window.print()}
              className="bg-blue-500 text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              IMPRIMIR
            </button>
            
            <button
              onClick={onRestart}
              className="bg-green-500 text-white text-lg font-bold py-4 px-6 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <Home className="w-5 h-5" />
              INÍCIO
            </button>
          </div>
        </div>
      </div>
      
      <p className="text-gray-600 text-center">
        Protocolo: <strong>#{Date.now().toString(36).toUpperCase()}</strong>
      </p>
    </div>
  );
};

// App Principal
export default function CadastroSocialApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [currentBlock, setCurrentBlock] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState([]);
  const [userData, setUserData] = useState({});
  
  // Navegação
  const handleNext = () => {
    if (currentScreen === 'welcome') {
      setCurrentScreen('blockMenu');
    }
  };
  
  const handleSelectBlock = (blockKey) => {
    setCurrentBlock(blockKey);
    setCurrentQuestionIndex(0);
    setCurrentScreen('question');
  };
  
  const handleQuestionNext = () => {
    const block = questionBlocks[currentBlock];
    if (currentQuestionIndex < block.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Bloco completo
      if (!completedBlocks.includes(currentBlock)) {
        setCompletedBlocks([...completedBlocks, currentBlock]);
      }
      setCurrentScreen('blockCompletion');
    }
  };
  
  const handleQuestionBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      setCurrentScreen('blockMenu');
    }
  };
  
  const handleBlockContinue = () => {
    if (completedBlocks.length === Object.keys(questionBlocks).length) {
      setCurrentScreen('finalSuccess');
    } else {
      setCurrentScreen('blockMenu');
    }
  };
  
  const handleAnswerChange = (value) => {
    const block = questionBlocks[currentBlock];
    const question = block.questions[currentQuestionIndex];
    
    setUserData({
      ...userData,
      [currentBlock]: {
        ...userData[currentBlock],
        [question.id]: value
      }
    });
  };
  
  const handleRestart = () => {
    setCurrentScreen('welcome');
    setCurrentBlock(null);
    setCurrentQuestionIndex(0);
    setCompletedBlocks([]);
    setUserData({});
  };
  
  // Salvar progresso no localStorage
  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      localStorage.setItem('cadastroSocial_userData', JSON.stringify(userData));
      localStorage.setItem('cadastroSocial_completedBlocks', JSON.stringify(completedBlocks));
    }
  }, [userData, completedBlocks]);
  
  // Recuperar progresso do localStorage
  useEffect(() => {
    const savedUserData = localStorage.getItem('cadastroSocial_userData');
    const savedCompletedBlocks = localStorage.getItem('cadastroSocial_completedBlocks');
    
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
    }
    if (savedCompletedBlocks) {
      setCompletedBlocks(JSON.parse(savedCompletedBlocks));
    }
  }, []);
  
  // Renderizar tela atual
  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={handleNext} />;
        
      case 'blockMenu':
        return (
          <BlockMenu
            blocks={questionBlocks}
            completedBlocks={completedBlocks}
            currentBlock={currentBlock}
            onSelectBlock={handleSelectBlock}
          />
        );
        
      case 'question':
        if (!currentBlock) return null;
        const block = questionBlocks[currentBlock];
        const question = block.questions[currentQuestionIndex];
        const currentValue = userData[currentBlock]?.[question.id];
        
        // Verificar condições
        if (question.conditional) {
          const [condField, condValue] = question.conditional.split(':');
          const actualValue = userData[currentBlock]?.[condField];
          if (actualValue !== condValue) {
            handleQuestionNext();
            return null;
          }
        }
        
        return (
          <QuestionScreen
            question={question}
            value={currentValue}
            onChange={handleAnswerChange}
            onNext={handleQuestionNext}
            onBack={handleQuestionBack}
            blockTitle={block.title}
            questionIndex={currentQuestionIndex}
            totalQuestions={block.questions.length}
          />
        );
        
      case 'blockCompletion':
        return (
          <BlockCompletionScreen
            blockTitle={questionBlocks[currentBlock].title}
            onContinue={handleBlockContinue}
          />
        );
        
      case 'finalSuccess':
        return (
          <FinalSuccessScreen
            userData={userData}
            onRestart={handleRestart}
          />
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="font-sans">
      {renderScreen()}
    </div>
  );
}