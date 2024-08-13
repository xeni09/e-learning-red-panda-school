import React from 'react';
import logo from '../assets/logo-transparente.png';

const TermsOfService = () => {
  return (
    <>
      <div className="flex flex-col justify-center py-12 px-12 w-full max-w-screen-md min-h-screen mx-auto">
        <div>
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
            Terms of Service
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium leading-6">
              Introduction
            </h3>
            <p className="mt-2 text-sm">
              Welcome to Red Panda School. By using our website, you agree to abide by the ancient code of the Red Panda: eat bamboo, be adorable, and avoid giant pandas at all costs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Intellectual Property Rights
            </h3>
            <p className="mt-2 text-sm">
              All the cool stuff on this website (except for your own content) belongs to us. If you try to claim it's yours, we'll send a troop of red pandas to stare at you disapprovingly.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Restrictions
            </h3>
            <p className="mt-2 text-sm">
              You are specifically restricted from all of the following:
            </p>
            <ul className="list-disc font-light pl-10 text-sm">
              <li>Publishing any Website material in any other media (unless you want a visit from our ninja red pandas)</li>
              <li>Selling, sublicensing and/or otherwise commercializing any Website material (we're not running a flea market here)</li>
              <li>Publicly performing and/or showing any Website material (no surprise performances of our Terms of Service at parties, please)</li>
              <li>Using this Website in any way that is or may be damaging to this Website (our feelings get hurt easily)</li>
              <li>Using this Website in any way that impacts user access to this Website (we like to keep things smooth and silky)</li>
              <li>Using this Website contrary to applicable laws and regulations (the red pandas have connections in high places)</li>
              <li>Engaging in any data mining, data harvesting, data extracting or any other similar activity in relation to this Website (the red pandas are not fans of data salad)</li>
              <li>Using this Website to engage in any advertising or marketing (unless it's about bamboo or cuteness)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Your Privacy
            </h3>
            <p className="mt-2 text-sm">
              Please read our Privacy Policy, which is guarded by a red panda with a very serious look on its face.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Limitation of Liability
            </h3>
            <p className="mt-2 text-sm">
              In no event shall Red Panda School, nor any of its officers, directors, and employees (or red pandas), be held liable for anything arising out of or in any way connected with your use of this Website. If your cat doesn't like our website, that's on you.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Changes to These Terms
            </h3>
            <p className="mt-2 text-sm">
              Red Panda School is permitted to revise these Terms at any time as it sees fit, and by using this Website you are expected to review these Terms on a regular basis. If you don't, a red panda will find you and give you a very stern lecture.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;