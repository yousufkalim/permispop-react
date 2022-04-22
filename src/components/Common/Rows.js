function createData(wording, comments) {
  return { wording, comments };
}
const rows = [
  createData(
    " A turn in the road must be performed without hitting or touching the curb and within as few moves as necessary "
  ),
  createData(
    " This is the first lesson where you learn what does what in the car. "
  ),
  createData(" Tenir, tourner le volant et maintenir la trajectoire "),
  createData(" Démarrer et s’arrêter. "),
  createData("  Doser l’accélération et le freinage à diverses allures."),
  createData("  Utiliser la boîte de vitesses."),

  createData(
    "  Diriger la voiture en avant en ligne droite et en courbe en adaptant allure et trajectoire."
  ),

  createData("  Regarder autour de soi et avertir."),
  createData("  Effectuer une marche arrière et un demi-tour en sécurité.."),
];
const rows2 = [
  createData("Entrer, s’installer au poste de conduite et en sortir. "),
  createData(
    "  Rechercher la signalisation, les indices utiles et en tenir compte "
  ),
  createData(
    "  Positionner le véhicule sur la chaussée et choisir la voie de circulation."
  ),
  createData(" Adapter l’allure aux situations. "),
  createData(" Tourner à droite et à gauche en agglomération."),
  createData(
    " Détecter, identifier et franchir les intersections suivant le régime de priorité.."
  ),

  createData(" Franchir les ronds-points et les carrefours à sens giratoire."),

  createData("   S’arrêter et stationner en épi, en bataille et en créneau."),
];

const rows3 = [
  createData("Evaluer et maintenir les distances de sécurité. "),
  createData(" Croiser, dépasser, être dépassé. "),
  createData(" Passer des virages et conduire en déclivité."),
  createData(
    "  Connaître les caractéristiques des autres usagers et savoir se comporter à leur égard avec respect et courtoisie "
  ),
  createData("S’insérer, circuler et sortir d’une voie rapide."),
  createData(
    "  Conduire dans une file de véhicules et dans une circulation dense."
  ),

  createData(" . Conduire quand l’adhérence et la visibilité sont réduites."),
];

const rows4 = [
  createData("Suivre un itinéraire de manière autonome.. "),
  createData(
    "Préparer et effectuer un voyage « longue distance » en autonomie. "
  ),
  createData(
    " Connaître les principaux facteurs de risque au volant et les recommandations à appliquer.."
  ),
  createData(
    " Connaître les comportements à adopter en cas d’accident : protéger, alerter, secourir."
  ),
  createData(
    " Faire l’expérience des aides à la conduite du véhicule (régulateur, limiteur de vitesse, ABS,aides à la navigation...)."
  ),
  createData(
    "  Avoir des notions sur l’entretien, le dépannage et les situations d’urgence."
  ),

  createData("Pratiquer l’écoconduite."),
];
module.exports = { rows, rows2, rows3, rows4 };
