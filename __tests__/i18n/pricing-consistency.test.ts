import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import koMessages from '@/messages/ko.json';
import thMessages from '@/messages/th.json';

describe('Pricing Consistency Across Languages', () => {
  const locales = [
    { name: 'English', messages: enMessages },
    { name: 'Japanese', messages: jaMessages },
    { name: 'Korean', messages: koMessages },
    { name: 'Thai', messages: thMessages },
  ];

  describe('Home TAK Solutions Pricing', () => {
    it('should have identical hosting plan prices across all languages', () => {
      const hostingPlans = ['starter', 'professional', 'enterprise'];
      const enPrices = hostingPlans.map(
        (plan) => enMessages.homeTakSolutions.hosting.plans[plan as keyof typeof enMessages.homeTakSolutions.hosting.plans].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = hostingPlans.map(
          (plan) => messages.homeTakSolutions.hosting.plans[plan as keyof typeof messages.homeTakSolutions.hosting.plans].price
        );
        expect(prices).toEqual(enPrices);
      });
    });

    it('should have identical deployment package prices across all languages', () => {
      const packages = ['assessment', 'deployment', 'enterprise'];
      const enPrices = packages.map(
        (pkg) => enMessages.homeTakSolutions.deployment.packages[pkg as keyof typeof enMessages.homeTakSolutions.deployment.packages].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = packages.map(
          (pkg) => messages.homeTakSolutions.deployment.packages[pkg as keyof typeof messages.homeTakSolutions.deployment.packages].price
        );
        expect(prices).toEqual(enPrices);
      });
    });

    it('should have identical training program prices across all languages', () => {
      const programs = ['fundamentals', 'nerva', 'advanced'];
      const enPrices = programs.map(
        (prog) => enMessages.homeTakSolutions.training.programs[prog as keyof typeof enMessages.homeTakSolutions.training.programs].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = programs.map(
          (prog) => messages.homeTakSolutions.training.programs[prog as keyof typeof messages.homeTakSolutions.training.programs].price
        );
        expect(prices).toEqual(enPrices);
      });
    });

    it('should have identical additional service prices across all languages', () => {
      const services = ['administration', 'plugins', 'hardware'];
      const enPrices = services.map(
        (svc) => enMessages.homeTakSolutions.additionalServices.services[svc as keyof typeof enMessages.homeTakSolutions.additionalServices.services].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = services.map(
          (svc) => messages.homeTakSolutions.additionalServices.services[svc as keyof typeof messages.homeTakSolutions.additionalServices.services].price
        );
        expect(prices).toEqual(enPrices);
      });
    });
  });

  describe('TAK Solutions Page Pricing', () => {
    it('should have identical TAK hosting plan prices across all languages', () => {
      const plans = ['starter', 'professional', 'enterprise'];
      const enPrices = plans.map(
        (plan) => enMessages.takSolutions.services.hosting.plans[plan as keyof typeof enMessages.takSolutions.services.hosting.plans].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = plans.map(
          (plan) => messages.takSolutions.services.hosting.plans[plan as keyof typeof messages.takSolutions.services.hosting.plans].price
        );
        expect(prices).toEqual(enPrices);
      });
    });

    it('should have identical TAK deployment plan prices across all languages', () => {
      const plans = ['assessment', 'deployment', 'enterprise'];
      const enPrices = plans.map(
        (plan) => enMessages.takSolutions.services.deployment.plans[plan as keyof typeof enMessages.takSolutions.services.deployment.plans].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = plans.map(
          (plan) => messages.takSolutions.services.deployment.plans[plan as keyof typeof messages.takSolutions.services.deployment.plans].price
        );
        expect(prices).toEqual(enPrices);
      });
    });

    it('should have identical TAK training program prices across all languages', () => {
      const programs = ['fundamentals', 'nerva', 'advanced'];
      const enPrices = programs.map(
        (prog) => enMessages.takSolutions.services.training.programs[prog as keyof typeof enMessages.takSolutions.services.training.programs].price
      );

      locales.forEach(({ name, messages }) => {
        const prices = programs.map(
          (prog) => messages.takSolutions.services.training.programs[prog as keyof typeof messages.takSolutions.services.training.programs].price
        );
        expect(prices).toEqual(enPrices);
      });
    });
  });

  describe('Pricing Structure Completeness', () => {
    it('should have homeTakSolutions section in all languages', () => {
      locales.forEach(({ name, messages }) => {
        expect(messages).toHaveProperty('homeTakSolutions');
        expect(messages.homeTakSolutions).toBeDefined();
      });
    });

    it('should have all hosting plans in homeTakSolutions for all languages', () => {
      const requiredPlans = ['starter', 'professional', 'enterprise'];
      locales.forEach(({ name, messages }) => {
        requiredPlans.forEach((plan) => {
          expect(messages.homeTakSolutions.hosting.plans).toHaveProperty(plan);
          expect(messages.homeTakSolutions.hosting.plans[plan as keyof typeof messages.homeTakSolutions.hosting.plans]).toHaveProperty('price');
        });
      });
    });

    it('should have all deployment packages in homeTakSolutions for all languages', () => {
      const requiredPackages = ['assessment', 'deployment', 'enterprise'];
      locales.forEach(({ name, messages }) => {
        requiredPackages.forEach((pkg) => {
          expect(messages.homeTakSolutions.deployment.packages).toHaveProperty(pkg);
          expect(messages.homeTakSolutions.deployment.packages[pkg as keyof typeof messages.homeTakSolutions.deployment.packages]).toHaveProperty('price');
        });
      });
    });

    it('should have all training programs in homeTakSolutions for all languages', () => {
      const requiredPrograms = ['fundamentals', 'nerva', 'advanced'];
      locales.forEach(({ name, messages }) => {
        requiredPrograms.forEach((prog) => {
          expect(messages.homeTakSolutions.training.programs).toHaveProperty(prog);
          expect(messages.homeTakSolutions.training.programs[prog as keyof typeof messages.homeTakSolutions.training.programs]).toHaveProperty('price');
        });
      });
    });
  });
});
