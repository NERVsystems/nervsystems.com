import enMessages from '@/messages/en.json';

describe('Translation Messages', () => {
  describe('English messages structure', () => {
    it('should load en.json successfully', () => {
      expect(enMessages).toBeDefined();
      expect(typeof enMessages).toBe('object');
    });

    it('should not be empty', () => {
      expect(Object.keys(enMessages).length).toBeGreaterThan(0);
    });
  });

  describe('Required top-level sections', () => {
    const requiredSections = [
      'nav',
      'hero',
      'nerva',
      'features',
      'tak',
      'takCallout',
      'partners',
      'contact',
      'footer',
      'takSolutions',
    ];

    requiredSections.forEach((section) => {
      it(`should have "${section}" section`, () => {
        expect(enMessages).toHaveProperty(section);
        expect(enMessages[section as keyof typeof enMessages]).toBeDefined();
      });
    });
  });

  describe('Navigation section', () => {
    it('should have all navigation items', () => {
      expect(enMessages.nav).toHaveProperty('features');
      expect(enMessages.nav).toHaveProperty('platform');
      expect(enMessages.nav).toHaveProperty('takSolutions');
      expect(enMessages.nav).toHaveProperty('contact');
      expect(enMessages.nav).toHaveProperty('requestDemo');
    });

    it('should have non-empty navigation labels', () => {
      Object.values(enMessages.nav).forEach((value) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hero section', () => {
    it('should have title and subtitle', () => {
      expect(enMessages.hero).toHaveProperty('title');
      expect(enMessages.hero).toHaveProperty('subtitle');
      expect(enMessages.hero.title).toBeTruthy();
      expect(enMessages.hero.subtitle).toBeTruthy();
    });

    it('should have stats with all required fields', () => {
      expect(enMessages.hero).toHaveProperty('stats');
      expect(enMessages.hero.stats).toHaveProperty('planning');
      expect(enMessages.hero.stats).toHaveProperty('edge');
      expect(enMessages.hero.stats).toHaveProperty('tak');

      // Check each stat has value and label
      Object.values(enMessages.hero.stats).forEach((stat) => {
        expect(stat).toHaveProperty('value');
        expect(stat).toHaveProperty('label');
        expect(stat.value).toBeTruthy();
        expect(stat.label).toBeTruthy();
      });
    });

    it('should have CTA buttons', () => {
      expect(enMessages.hero).toHaveProperty('cta');
      expect(enMessages.hero.cta).toHaveProperty('demo');
      expect(enMessages.hero.cta).toHaveProperty('learn');
    });
  });

  describe('NERVA section', () => {
    it('should have all required fields', () => {
      expect(enMessages.nerva).toHaveProperty('tagline');
      expect(enMessages.nerva).toHaveProperty('subtitle');
      expect(enMessages.nerva).toHaveProperty('description');
      expect(enMessages.nerva).toHaveProperty('decisionAdvantage');
    });

    it('should have capabilities section', () => {
      expect(enMessages.nerva).toHaveProperty('capabilities');
      const capabilities = enMessages.nerva.capabilities;

      // Check for key capabilities
      const requiredCapabilities = ['uas', 'medevac', 'threat', 'sar', 'alert', 'airspace'];
      requiredCapabilities.forEach((cap) => {
        expect(capabilities).toHaveProperty(cap);
      });
    });

    it('should have properly structured capabilities', () => {
      Object.values(enMessages.nerva.capabilities).forEach((capability) => {
        expect(capability).toHaveProperty('icon');
        expect(capability).toHaveProperty('title');
        expect(capability).toHaveProperty('command');
        expect(capability).toHaveProperty('description');
        expect(capability).toHaveProperty('features');
        expect(Array.isArray(capability.features)).toBe(true);
        expect(capability.features.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Features section', () => {
    it('should have title and subtitle', () => {
      expect(enMessages.features).toHaveProperty('title');
      expect(enMessages.features).toHaveProperty('subtitle');
    });

    it('should have all feature items', () => {
      expect(enMessages.features).toHaveProperty('items');
      const items = enMessages.features.items;

      const requiredItems = ['planning', 'fusion', 'assessment', 'edge'];
      requiredItems.forEach((item) => {
        expect(items).toHaveProperty(item);
      });
    });

    it('should have properly structured feature items', () => {
      Object.values(enMessages.features.items).forEach((item) => {
        expect(item).toHaveProperty('title');
        expect(item).toHaveProperty('description');
        expect(item).toHaveProperty('icon');
        expect(item.title).toBeTruthy();
        expect(item.description).toBeTruthy();
      });
    });
  });

  describe('TAK section', () => {
    it('should have all required fields', () => {
      expect(enMessages.tak).toHaveProperty('title');
      expect(enMessages.tak).toHaveProperty('subtitle');
    });

    it('should have integration details', () => {
      expect(enMessages.tak).toHaveProperty('integration');
      expect(typeof enMessages.tak.integration).toBe('object');
    });

    it('should have CTA button', () => {
      expect(enMessages.tak).toHaveProperty('cta');
      expect(enMessages.tak.cta).toBeTruthy();
    });
  });

  describe('Contact section', () => {
    it('should have form structure', () => {
      expect(enMessages.contact).toHaveProperty('title');
      expect(enMessages.contact).toHaveProperty('subtitle');
      expect(enMessages.contact).toHaveProperty('form');
    });

    it('should have form details', () => {
      const form = enMessages.contact.form;
      expect(form).toHaveProperty('label');
      expect(form).toHaveProperty('title');
      expect(form).toHaveProperty('description');
      expect(form).toHaveProperty('button');
    });
  });

  describe('Footer section', () => {
    it('should have all required fields', () => {
      expect(enMessages.footer).toHaveProperty('tagline');
      expect(enMessages.footer).toHaveProperty('navigation');
      expect(enMessages.footer).toHaveProperty('contact');
      expect(enMessages.footer).toHaveProperty('copyright');
    });

    it('should have navigation and contact sections', () => {
      expect(enMessages.footer.navigation).toHaveProperty('title');
      expect(enMessages.footer.contact).toHaveProperty('title');
      expect(enMessages.footer.contact).toHaveProperty('email');
    });
  });

  describe('TAK Solutions page', () => {
    it('should have takSolutions section', () => {
      expect(enMessages).toHaveProperty('takSolutions');
    });

    it('should have all takSolutions subsections', () => {
      const requiredSections = ['hero', 'services', 'integration', 'competitive', 'resources', 'faq'];
      requiredSections.forEach((section) => {
        expect(enMessages.takSolutions).toHaveProperty(section);
      });
    });

    it('should have properly structured FAQ items', () => {
      expect(enMessages.takSolutions.faq).toHaveProperty('items');
      expect(Array.isArray(enMessages.takSolutions.faq.items)).toBe(true);

      enMessages.takSolutions.faq.items.forEach((item) => {
        expect(item).toHaveProperty('question');
        expect(item).toHaveProperty('answer');
        expect(item.question).toBeTruthy();
        expect(item.answer).toBeTruthy();
      });
    });
  });

  describe('No empty strings', () => {
    const checkNoEmptyStrings = (obj: any, path = ''): string[] => {
      const emptyPaths: string[] = [];

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          if (value.trim() === '') {
            emptyPaths.push(currentPath);
          }
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          emptyPaths.push(...checkNoEmptyStrings(value, currentPath));
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string' && item.trim() === '') {
              emptyPaths.push(`${currentPath}[${index}]`);
            } else if (typeof item === 'object' && item !== null) {
              emptyPaths.push(...checkNoEmptyStrings(item, `${currentPath}[${index}]`));
            }
          });
        }
      }

      return emptyPaths;
    };

    it('should not contain any empty strings', () => {
      const emptyPaths = checkNoEmptyStrings(enMessages);
      expect(emptyPaths).toEqual([]);
    });
  });

  describe('No emoji usage', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

    const checkNoEmoji = (obj: any, path = ''): string[] => {
      const pathsWithEmoji: string[] = [];

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          if (emojiRegex.test(value)) {
            pathsWithEmoji.push(currentPath);
          }
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
          pathsWithEmoji.push(...checkNoEmoji(value, currentPath));
        } else if (Array.isArray(value)) {
          value.forEach((item, index) => {
            if (typeof item === 'string' && emojiRegex.test(item)) {
              pathsWithEmoji.push(`${currentPath}[${index}]`);
            } else if (typeof item === 'object' && item !== null) {
              pathsWithEmoji.push(...checkNoEmoji(item, `${currentPath}[${index}]`));
            }
          });
        }
      }

      return pathsWithEmoji;
    };

    it('should not contain any emoji (tactical/military aesthetic requirement)', () => {
      const pathsWithEmoji = checkNoEmoji(enMessages);
      expect(pathsWithEmoji).toEqual([]);
    });
  });
});
