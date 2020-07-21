import React, { useState } from 'react';
import { MultiChoice, ButtonLink } from '../../uiComponents';

interface IPropsFC {
  fcLink: string;
  notFcLink: string;
}

const FcSellingPoints = () => (
  <div>
    <div>Ajouter un bouton FranceConnect sur votre service permet :</div>
    <ul>
      <li>de simplifier le parcours des usagers</li>
      <li>d’augmenter la sécurité de votre service et réduire la fraude</li>
      <li>
        d’identifier de manière unique un citoyen et éliminer les
        réconciliations d'identité
      </li>
    </ul>
  </div>
);

const yesNoOptions = [
  { label: 'Oui', value: true },
  { label: 'Non', value: false },
];

const IsFranceConnected: React.FC<IPropsFC> = ({ fcLink, notFcLink }) => {
  const [hasAlreadyFranceConnect, setHasFc] = useState<Boolean | null>(null);
  const [wantFranceConnect, setWantFc] = useState<Boolean | null>(null);
  const [link, setLink] = useState('');

  const hasFc = (answer: boolean) => {
    setHasFc(answer);
    if (answer) {
      setLink(fcLink);
    }
  };

  const wantFc = (answer: boolean) => {
    setWantFc(answer);
    setLink(answer ? fcLink : notFcLink);
  };
  return (
    <>
      <div className="question">
        <div>
          <b>Avez-vous déjà un accès au bouton FranceConnect ?</b>
        </div>
        <MultiChoice
          multiChoiceOptions={yesNoOptions}
          onClick={hasFc}
          selected={hasAlreadyFranceConnect}
        />
      </div>

      {hasAlreadyFranceConnect === false && (
        <>
          <FcSellingPoints />
          <div className="question">
            <div>
              <b>
                Souhaitez-vous également faire une demande de bouton
                FranceConnect pour votre service ?
              </b>
            </div>
            <MultiChoice
              multiChoiceOptions={yesNoOptions}
              onClick={wantFc}
              selected={wantFranceConnect}
            />
          </div>
        </>
      )}

      {!!link && (
        <div className="layout-center">
          <ButtonLink href={link} large>
            Remplir une demande
          </ButtonLink>
        </div>
      )}
      <style jsx>{`
        .question {
          margin: 40px auto;
        }
      `}</style>
    </>
  );
};

export default IsFranceConnected;
