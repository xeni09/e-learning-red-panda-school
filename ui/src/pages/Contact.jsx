import React, { useState } from 'react';
import { Field, Label, Switch } from '@headlessui/react';
import telephoneOrange from '../assets/telephone-orange.jpg';

const Contact = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="relative isolate px-6 py-24 sm:py-32 lg:px-8 ]" 
    
    >


      
     
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="   font-light  text-[var(--color-black)] ">Contact Us</h1>
        <h2 className="mt-2 text-5xl text-center font-bold text-[var(--color-black)]">
        Get in touch with our creator friendly support team!
        </h2>
      </div>
      <form action="#" method="POST" className="mx-auto mt-10 max-w-xl">
        <div className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2">
          <div>
            <input
              id="first-name"
              name="first-name"
              type="text"
              autoComplete="given-name"
              placeholder="First name*"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-orange)] sm:text-sm sm:leading-6"
            />
          </div>
          <div>
            <input
              id="last-name"
              name="last-name"
              type="text"
              autoComplete="family-name"
              placeholder="Last name*"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-orange)] sm:text-sm sm:leading-6"
            />
          </div>
        
          <div className="sm:col-span-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email Address*"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-orange)] sm:text-sm sm:leading-6"
            />
          </div>
          
          <div className="sm:col-span-2">
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Please, enter your question or message here.*"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-[var(--color-black)] shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[var(--color-orange)] sm:text-sm sm:leading-6"
              defaultValue={''}
            />
          </div>
          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-orange)] data-[checked]:bg-[var(--color-orange)]"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-[var(--color-grey)]">
              By selecting this, you agree to our{' '}
              <a href="#" className="font-semibold text-[var(--color-orange)]">
                privacy&nbsp;policy*
              </a>
              .
            </Label>
          </Field>
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="btn-fullwidth"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

export default Contact;