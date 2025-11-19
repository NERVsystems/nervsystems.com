import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import koMessages from '@/messages/ko.json';
import thMessages from '@/messages/th.json';
import arMessages from '@/messages/ar.json';

const allMessages = {
  en: enMessages,
  ja: jaMessages,
  ko: koMessages,
  th: thMessages,
  ar: arMessages,
};

describe('Form Translation Structure', () => {
  // Test each language has the form section
  Object.entries(allMessages).forEach(([locale, messages]) => {
    describe(`${locale.toUpperCase()} form translations`, () => {
      it(`should have form section in ${locale}`, () => {
        expect(messages).toHaveProperty('form');
        expect(messages.form).toBeDefined();
      });

      describe('Form types', () => {
        const formTypes = ['demo', 'quote', 'contact'] as const;

        formTypes.forEach((formType) => {
          it(`should have ${formType} form translations in ${locale}`, () => {
            expect(messages.form).toHaveProperty(formType);
            expect(messages.form[formType]).toHaveProperty('title');
            expect(messages.form[formType]).toHaveProperty('subtitle');
            expect(messages.form[formType].title).toBeTruthy();
            expect(messages.form[formType].subtitle).toBeTruthy();
          });

          it(`should have non-empty ${formType} translations in ${locale}`, () => {
            expect(messages.form[formType].title.trim()).not.toBe('');
            expect(messages.form[formType].subtitle.trim()).not.toBe('');
          });
        });
      });

      describe('Form fields', () => {
        const requiredFields = [
          'firstName',
          'lastName',
          'email',
          'organization',
          'phone',
          'jobTitle',
          'organisationType',
          'currentTakUsage',
          'estimatedTakUsers',
          'takDeploymentTimeline',
          'interest',
          'message',
        ];

        requiredFields.forEach((field) => {
          it(`should have "${field}" field translations in ${locale}`, () => {
            expect(messages.form.fields).toHaveProperty(field);
            expect(messages.form.fields[field as keyof typeof messages.form.fields]).toBeDefined();
          });
        });

        it('should have label or required for all fields', () => {
          Object.values(messages.form.fields).forEach((field) => {
            expect(
              field.hasOwnProperty('label') ||
              field.hasOwnProperty('required')
            ).toBe(true);
          });
        });

        it('should have placeholders for select fields', () => {
          const selectFields = ['organisationType', 'currentTakUsage', 'estimatedTakUsers', 'takDeploymentTimeline', 'message'];
          selectFields.forEach((fieldName) => {
            const field = messages.form.fields[fieldName as keyof typeof messages.form.fields];
            expect(field).toHaveProperty('placeholder');
            expect(field.placeholder).toBeTruthy();
          });
        });
      });

      describe('Form options', () => {
        it('should have all option groups', () => {
          const optionGroups = [
            'organisationType',
            'currentTakUsage',
            'estimatedTakUsers',
            'takDeploymentTimeline',
            'interest',
          ];

          optionGroups.forEach((group) => {
            expect(messages.form.options).toHaveProperty(group);
            expect(typeof messages.form.options[group as keyof typeof messages.form.options]).toBe('object');
          });
        });

        it('should have organisation type options', () => {
          const orgTypes = ['military', 'lawEnforcement', 'emergency', 'government', 'privateSecurity', 'commercial', 'other'];
          orgTypes.forEach((type) => {
            expect(messages.form.options.organisationType).toHaveProperty(type);
            expect(messages.form.options.organisationType[type as keyof typeof messages.form.options.organisationType]).toBeTruthy();
          });
        });

        it('should have TAK usage options', () => {
          const usageOptions = ['alreadyUsing', 'readyToPurchase', 'evaluating', 'researching'];
          usageOptions.forEach((option) => {
            expect(messages.form.options.currentTakUsage).toHaveProperty(option);
            expect(messages.form.options.currentTakUsage[option as keyof typeof messages.form.options.currentTakUsage]).toBeTruthy();
          });
        });

        it('should have estimated users ranges', () => {
          const ranges = ['range1', 'range2', 'range3', 'range4'];
          ranges.forEach((range) => {
            expect(messages.form.options.estimatedTakUsers).toHaveProperty(range);
            expect(messages.form.options.estimatedTakUsers[range as keyof typeof messages.form.options.estimatedTakUsers]).toBeTruthy();
          });
        });

        it('should have deployment timeline options', () => {
          const timelines = ['immediate', 'shortTerm', 'mediumTerm', 'longTerm'];
          timelines.forEach((timeline) => {
            expect(messages.form.options.takDeploymentTimeline).toHaveProperty(timeline);
            expect(messages.form.options.takDeploymentTimeline[timeline as keyof typeof messages.form.options.takDeploymentTimeline]).toBeTruthy();
          });
        });

        it('should have interest options', () => {
          const interests = ['nerva', 'hosting', 'deployment', 'training', 'administration', 'plugins', 'edge', 'other'];
          interests.forEach((interest) => {
            expect(messages.form.options.interest).toHaveProperty(interest);
            expect(messages.form.options.interest[interest as keyof typeof messages.form.options.interest]).toBeTruthy();
          });
        });
      });

      describe('Form buttons', () => {
        it('should have all button translations', () => {
          expect(messages.form.buttons).toHaveProperty('submit');
          expect(messages.form.buttons).toHaveProperty('submitting');
          expect(messages.form.buttons).toHaveProperty('cancel');
          expect(messages.form.buttons).toHaveProperty('close');

          expect(messages.form.buttons.submit).toBeTruthy();
          expect(messages.form.buttons.submitting).toBeTruthy();
          expect(messages.form.buttons.cancel).toBeTruthy();
          expect(messages.form.buttons.close).toBeTruthy();
        });

        it('should have non-empty button labels', () => {
          Object.values(messages.form.buttons).forEach((value) => {
            expect(typeof value).toBe('string');
            expect(value.trim()).not.toBe('');
          });
        });
      });

      describe('Form messages', () => {
        it('should have success message structure', () => {
          expect(messages.form.messages).toHaveProperty('success');
          expect(messages.form.messages.success).toHaveProperty('title');
          expect(messages.form.messages.success).toHaveProperty('demo');
          expect(messages.form.messages.success).toHaveProperty('quote');
          expect(messages.form.messages.success).toHaveProperty('contact');
        });

        it('should have non-empty success messages', () => {
          expect(messages.form.messages.success.title.trim()).not.toBe('');
          expect(messages.form.messages.success.demo.trim()).not.toBe('');
          expect(messages.form.messages.success.quote.trim()).not.toBe('');
          expect(messages.form.messages.success.contact.trim()).not.toBe('');
        });

        it('should have error message', () => {
          expect(messages.form.messages).toHaveProperty('error');
          expect(messages.form.messages.error).toBeTruthy();
          expect(messages.form.messages.error.trim()).not.toBe('');
        });

        it('should have privacy message', () => {
          expect(messages.form.messages).toHaveProperty('privacy');
          expect(messages.form.messages.privacy).toBeTruthy();
          expect(messages.form.messages.privacy.trim()).not.toBe('');
        });
      });
    });
  });

  describe('Cross-language consistency', () => {
    it('should have same form structure across all languages', () => {
      const enKeys = Object.keys(enMessages.form);

      Object.entries(allMessages).forEach(([locale, messages]) => {
        if (locale === 'en') return;

        const localeKeys = Object.keys(messages.form);
        expect(localeKeys.sort()).toEqual(enKeys.sort());
      });
    });

    it('should have same number of organisation types across all languages', () => {
      const enOrgTypes = Object.keys(enMessages.form.options.organisationType);

      Object.entries(allMessages).forEach(([locale, messages]) => {
        if (locale === 'en') return;

        const localeOrgTypes = Object.keys(messages.form.options.organisationType);
        expect(localeOrgTypes.length).toBe(enOrgTypes.length);
        expect(localeOrgTypes.sort()).toEqual(enOrgTypes.sort());
      });
    });

    it('should have same number of interest options across all languages', () => {
      const enInterests = Object.keys(enMessages.form.options.interest);

      Object.entries(allMessages).forEach(([locale, messages]) => {
        if (locale === 'en') return;

        const localeInterests = Object.keys(messages.form.options.interest);
        expect(localeInterests.length).toBe(enInterests.length);
        expect(localeInterests.sort()).toEqual(enInterests.sort());
      });
    });

    it('should have matching field keys across all languages', () => {
      const enFieldKeys = Object.keys(enMessages.form.fields);

      Object.entries(allMessages).forEach(([locale, messages]) => {
        if (locale === 'en') return;

        const localeFieldKeys = Object.keys(messages.form.fields);
        expect(localeFieldKeys.sort()).toEqual(enFieldKeys.sort());
      });
    });
  });

  describe('No emoji in form translations (tactical requirement)', () => {
    const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;

    const checkNoEmoji = (obj: any, path = ''): string[] => {
      const pathsWithEmoji: string[] = [];

      for (const [key, value] of Object.entries(obj)) {
        const currentPath = path ? `${path}.${key}` : key;

        if (typeof value === 'string') {
          if (emojiRegex.test(value)) {
            pathsWithEmoji.push(currentPath);
          }
        } else if (typeof value === 'object' && value !== null) {
          pathsWithEmoji.push(...checkNoEmoji(value, currentPath));
        }
      }

      return pathsWithEmoji;
    };

    Object.entries(allMessages).forEach(([locale, messages]) => {
      it(`should not contain emoji in ${locale} form translations`, () => {
        const pathsWithEmoji = checkNoEmoji(messages.form);
        expect(pathsWithEmoji).toEqual([]);
      });
    });
  });

  describe('Email reference consistency', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      it(`should reference contact email in error message for ${locale}`, () => {
        expect(messages.form.messages.error).toContain('contact@nervsystems.com');
      });
    });
  });
});
