class DamageReport {
  static const Map<String, dynamic> mockDamageReport = {
    'totalAffected': 1247,
    'materialDamage': {
      'homeLoss': 423,
      'furnitureLoss': 892,
      'vehicleLoss': 234,
      'workEquipmentLoss': 567,
      'forcedMove': 981
    },
    'healthDamage': {
      'physical': 234,
      'respiratory': 456,
      'emotional': 789,
      'inTreatment': 345
    },
    'economicDamage': {
      'jobLoss': 678,
      'cannotWork': 456,
      'productionLoss': 234
    },
    'familyImpact': {
      'totalDeaths': 23,
      'totalDisappeared': 5,
      'averageFamilySizeBefore': 4.2,
      'averageFamilySizeAfter': 3.8
    }
  };
}
