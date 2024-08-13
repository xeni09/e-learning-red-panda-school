import React from 'react';
import logo from '../assets/logo-transparente.png';

const PrivacyPolicy = () => {
  return (
    <>
      <div className="flex flex-col justify-center py-12 px-12 w-full max-w-screen-md mx-auto">
        <div>
          <img
            alt="Red Panda School"
            src={logo}
            className="mx-auto mt-6 h-28 w-auto"
          />
          <h2 className="mt-6 pb-10 text-center text-2xl font-bold leading-9 tracking-tight text-dark-900">
            Privacy Policy
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium leading-6">
              Introduction
            </h3>
            <p className="mt-2 text-sm">
              Welcome to Red Panda School. This Privacy Policy outlines how we collect, use, and protect your personal information. Spoiler alert: we mostly just collect bamboo recipes and red panda memes.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Information We Collect
            </h3>
            <p className="mt-2 text-sm">
              We collect various types of information in connection with the services we provide, including:
            </p>
            <ul className="list-disc font-light pl-10 text-sm">
              <li>Personal identification information (Name, email address, phone number, favorite type of bamboo, etc.)</li>
              <li>Usage data (pages visited, time spent on the site, and how long you stared at cute panda pictures)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              How We Use Your Information
            </h3>
            <p className="mt-2 text-sm">
              We use the information we collect in various ways, including to:
            </p>
            <ul className="list-disc font-light ps-10 text-sm">
              <li>Provide, operate, and maintain our website (and make sure the red pandas are happy)</li>
              <li>Improve, personalize, and expand our website (with more red panda photos)</li>
              <li>Understand and analyze how you use our website (to optimize red panda cuteness)</li>
              <li>Develop new products, services, features, and functionality (possibly including red panda plushies)</li>
              <li>Communicate with you, either directly or through one of our partners (especially if we find a new red panda fact)</li>
              <li>Send you emails (full of red panda news)</li>
              <li>Find and prevent fraud (like fake red panda profiles)</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Log Files
            </h3>
            <p className="mt-2 text-sm">
              Red Panda School follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. Yes, even red pandas have logs.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Cookies and Web Beacons
            </h3>
            <p className="mt-2 text-sm">
              Like any other website, Red Panda School uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. Note: these are not actual cookies, and our red pandas are very disappointed about this.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Third Party Privacy Policies
            </h3>
            <p className="mt-2 text-sm">
              Red Panda School's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. Especially if they also love red pandas.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium leading-6">
              Changes to This Privacy Policy
            </h3>
            <p className="mt-2 text-sm">
              Red Panda School may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We promise to make it as cute as possible.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;