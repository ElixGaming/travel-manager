TRAVEL MANAGER — PWA
====================

CONTENU
- index.html : application responsive tactile
- manifest.webmanifest : configuration installable
- sw.js : cache hors connexion de l'interface
- icons/ : icônes de l'application

INSTALLATION SUR ANDROID
1. Héberge tout le dossier sur un serveur HTTPS (les PWA et service workers nécessitent HTTPS, sauf localhost).
2. Ouvre l'URL dans Chrome sur la tablette.
3. Connecte-toi une première fois pour charger l'interface et son cache.
4. Menu ⋮ > Installer l'application (ou Ajouter à l'écran d'accueil).
5. Ouvre l'application une fois en ligne, puis vérifie le mode avion pour tester l'interface hors connexion.

DONNÉES ET SAUVEGARDE
- Les réglages, vols et METAR archivés sont enregistrés dans le stockage local du navigateur de la tablette.
- Dans Bibliothèque, utilise « Exporter une sauvegarde » pour créer un fichier JSON et transfère-le pour le conserver.
- « Restaurer une sauvegarde » permet d'importer ce fichier sur un autre appareil.
- Effacer les données du navigateur peut supprimer la sauvegarde locale : exporte régulièrement.

SIMBRIEF / METAR
- SimBrief : récupération directe tentée via l'API publique. Selon CORS, la connexion ou l'API, cela peut échouer ; importer un export JSON/XML est prévu comme solution de secours.
- METAR : requête vers l'API Aviation Weather Center. L'accès en direct nécessite Internet et peut dépendre du réseau.
- Les plans et METAR déjà sauvegardés restent consultables hors ligne.

SÉCURITÉ
Le Suit Manager est une simulation ludique. La sélection des sources et les niveaux de bouteilles ne pilotent pas de matériel réel. Les valeurs ne sont pas des mesures d'oxygène réel et ne doivent pas être utilisées pour un système respiratoire.

POUR TESTER SUR UN PC
Dans le dossier contenant les fichiers, lance par exemple :
  python -m http.server 8080
Puis ouvre http://localhost:8080. Le service worker fonctionne sur localhost. Pour une tablette Android, utilise un hébergement HTTPS ou un serveur local configuré avec HTTPS.
