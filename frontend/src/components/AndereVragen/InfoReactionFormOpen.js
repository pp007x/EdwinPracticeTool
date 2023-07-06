import React, { useState } from 'react';
import styles from '../../Css/ReactionForm.module.css';
import { useNavigate } from 'react-router-dom';


  const IntroPageOpen = () => {
    const navigate = useNavigate();
  
    const handleIntroRead = () => {
      navigate('/reactionformopen');
    };

  return (
    <div className={styles["form-control"]}>
        <div>
          <h1>Wekom!</h1>
          <p>Welkom bij de ontdekkingsreis naar uw unieke DISC-profiel. DISC is een krachtig en breed erkend psychometrisch instrument dat u helpt bij het begrijpen van uw persoonlijke werkstijl, communicatievoorkeuren en gedragspatronen. Dit inzicht kan u helpen effectiever te worden in uw persoonlijke en professionele leven, door de manier waarop u omgaat met anderen te verbeteren en door uzelf beter te begrijpen.</p>

<p>Het DISC-model classificeert individuen op basis van vier primaire gedragsstijlen: Dominantie (D), Invloed (I), Stabiliteit (S) en Consciëntieusheid (C). Deze stijlen hebben elk unieke kenmerken en zijn gebaseerd op hoe u als individu reageert op uitdagingen, hoe u met anderen omgaat, hoe u veranderingen benadert en hoe u regels en procedures interpreteert.</p>

<p>Voordat u aan de vragenlijst begint, zijn er enkele belangrijke punten die u in gedachten moet houden. Ten eerste, 
    er is geen 'goed' of 'fout' DISC-profiel. Elke stijl heeft zijn eigen sterke punten en mogelijkheden voor groei.
     Het is ook belangrijk om te begrijpen dat de meeste mensen een mix van stijlen hebben, met één of twee die meestal dominanter zijn.</p>

<p>Als u de vragenlijst invult, probeer dan eerlijk en authentiek te zijn. Antwoord op basis van hoe u zichzelf werkelijk ziet, 
    niet hoe u zou willen zijn of hoe anderen u misschien zien. Denk aan uw gedrag en gevoelens in een verscheidenheid aan situaties.</p> 

<p>Houd er rekening mee dat deze vragenlijst geen volledig beeld van u als persoon zal geven.
     U bent complexer dan elk model kan beschrijven. Het doel hier is om een basisinzicht te bieden dat kan bijdragen aan persoonlijke groei
      en effectievere interacties met anderen.</p>

<p>Na het invullen van de vragenlijst krijgt u een gedetailleerd rapport over uw DISC-profiel. 
    Dit rapport zal inzicht bieden in uw unieke sterktes en gedragstendensen, en zal ook suggesties geven over hoe u uw effectiviteit kunt verhogen. 
    Het kan nuttig zijn om deze resultaten te bespreken met een coach of mentor, die u kan helpen de inzichten in uw gedrag te vertalen naar 
    concrete stappen voor groei en verbetering.</p>

<p>Tot slot, weet dat uw DISC-profiel kan veranderen naarmate u groeit en verandert. 
    Dit instrument is bedoeld om u te helpen bij het navigeren door die veranderingen en om uw bewustzijn van uw unieke benadering 
    van werk en interactie te vergroten. We moedigen u aan om deze reis van zelfbewustzijn te omarmen en kijken uit naar uw ontdekkingen. 
    Veel succes met het invullen van de vragenlijst!</p>
          <button className={styles["button"]} onClick={handleIntroRead}>Ga door naar de vragen</button>
        </div>
    </div>
  );
};

export default IntroPageOpen;
