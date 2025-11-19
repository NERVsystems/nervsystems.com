import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import RequestDemoForm from '@/components/RequestDemoForm';
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

// Mock fetch for HubSpot API calls
global.fetch = jest.fn();

// Mock window.location.href assignment
delete (window as any).location;
(window as any).location = { href: '' };

describe('RequestDemoForm Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });
    // Reset location href
    window.location.href = '';
  });

  const renderWithIntl = (
    component: React.ReactNode,
    locale: string = 'en',
    messages: any = enMessages
  ) => {
    return render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        {component}
      </NextIntlClientProvider>
    );
  };

  describe('Demo Form Type', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      describe(`in ${locale.toUpperCase()}`, () => {
        it(`should render demo form title in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByText(messages.form.demo.title)).toBeInTheDocument();
        });

        it(`should render demo form subtitle in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByText(messages.form.demo.subtitle)).toBeInTheDocument();
        });

        it(`should render all required field labels in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);

          expect(screen.getByText(messages.form.fields.firstName.required)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.lastName.required)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.email.required)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.organization.required)).toBeInTheDocument();
        });

        it(`should show job title field for demo form in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByText(messages.form.fields.jobTitle.label)).toBeInTheDocument();
        });

        it(`should not show TAK-specific fields for demo form in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.queryByText(messages.form.fields.organisationType.required)).not.toBeInTheDocument();
          expect(screen.queryByText(messages.form.fields.currentTakUsage.required)).not.toBeInTheDocument();
        });

        it(`should render submit button in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByRole('button', { name: messages.form.buttons.submit })).toBeInTheDocument();
        });

        it(`should render cancel button in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByRole('button', { name: messages.form.buttons.cancel })).toBeInTheDocument();
        });

        it(`should render privacy message in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);
          expect(screen.getByText(messages.form.messages.privacy)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Quote Form Type', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      describe(`in ${locale.toUpperCase()}`, () => {
        it(`should render quote form title in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, locale, messages);
          expect(screen.getByText(messages.form.quote.title)).toBeInTheDocument();
        });

        it(`should show TAK-specific fields in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, locale, messages);
          expect(screen.getByText(messages.form.fields.organisationType.required)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.currentTakUsage.required)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.estimatedTakUsers.label)).toBeInTheDocument();
          expect(screen.getByText(messages.form.fields.takDeploymentTimeline.label)).toBeInTheDocument();
        });

        it(`should render phone as required in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, locale, messages);
          expect(screen.getByText(messages.form.fields.phone.required)).toBeInTheDocument();
        });

        it(`should render organisation type options in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, locale, messages);

          const orgTypeSelect = screen.getByLabelText(messages.form.fields.organisationType.required);
          expect(orgTypeSelect).toBeInTheDocument();

          // Check options are present
          expect(screen.getByText(messages.form.fields.organisationType.placeholder)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.organisationType.military)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.organisationType.lawEnforcement)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.organisationType.government)).toBeInTheDocument();
        });

        it(`should render TAK usage options in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, locale, messages);

          expect(screen.getByText(messages.form.options.currentTakUsage.alreadyUsing)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.currentTakUsage.readyToPurchase)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.currentTakUsage.evaluating)).toBeInTheDocument();
          expect(screen.getByText(messages.form.options.currentTakUsage.researching)).toBeInTheDocument();
        });
      });
    });
  });

  describe('Contact Form Type', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      describe(`in ${locale.toUpperCase()}`, () => {
        it(`should render contact form title in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, locale, messages);
          expect(screen.getByText(messages.form.contact.title)).toBeInTheDocument();
        });

        it(`should render message field as required in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, locale, messages);
          expect(screen.getByText(messages.form.fields.message.required)).toBeInTheDocument();
        });

        it(`should render message placeholder in ${locale}`, () => {
          renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, locale, messages);
          const messageField = screen.getByPlaceholderText(messages.form.fields.message.placeholder);
          expect(messageField).toBeInTheDocument();
        });
      });
    });
  });

  describe('Interest Options', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      it(`should render all interest options in ${locale}`, () => {
        renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);

        expect(screen.getByText(messages.form.options.interest.nerva)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.hosting)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.deployment)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.training)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.administration)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.plugins)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.edge)).toBeInTheDocument();
        expect(screen.getByText(messages.form.options.interest.other)).toBeInTheDocument();
      });
    });
  });

  describe('Form Submission', () => {
    it('should submit successfully in English', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />);

      // Fill required fields
      await user.type(screen.getByLabelText(enMessages.form.fields.firstName.required), 'John');
      await user.type(screen.getByLabelText(enMessages.form.fields.lastName.required), 'Doe');
      await user.type(screen.getByLabelText(enMessages.form.fields.email.required), 'john@example.com');
      await user.type(screen.getByLabelText(enMessages.form.fields.organization.required), 'ACME Corp');

      // Submit form
      const submitButton = screen.getByRole('button', { name: enMessages.form.buttons.submit });
      await user.click(submitButton);

      // Check for success message
      await waitFor(() => {
        expect(screen.getByText(enMessages.form.messages.success.title)).toBeInTheDocument();
      });
    });

    it('should show success message in Japanese after submission', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, 'ja', jaMessages);

      // Fill required fields
      await user.type(screen.getByLabelText(jaMessages.form.fields.firstName.required), '太郎');
      await user.type(screen.getByLabelText(jaMessages.form.fields.lastName.required), '山田');
      await user.type(screen.getByLabelText(jaMessages.form.fields.email.required), 'taro@example.com');
      await user.type(screen.getByLabelText(jaMessages.form.fields.organization.required), 'ACME株式会社');

      // Submit form
      const submitButton = screen.getByRole('button', { name: jaMessages.form.buttons.submit });
      await user.click(submitButton);

      // Wait for success message
      await waitFor(() => {
        expect(screen.getByText(jaMessages.form.messages.success.title)).toBeInTheDocument();
        expect(screen.getByText(jaMessages.form.messages.success.demo)).toBeInTheDocument();
      });
    });

    it('should show close button in success state in Korean', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, 'ko', koMessages);

      // Fill required fields
      await user.type(screen.getByLabelText(koMessages.form.fields.firstName.required), '민수');
      await user.type(screen.getByLabelText(koMessages.form.fields.lastName.required), '김');
      await user.type(screen.getByLabelText(koMessages.form.fields.email.required), 'minsu@example.com');
      await user.type(screen.getByLabelText(koMessages.form.fields.organization.required), 'ACME 회사');
      await user.type(screen.getByLabelText(koMessages.form.fields.message.required), '문의 내용');

      // Submit form
      const submitButton = screen.getByRole('button', { name: koMessages.form.buttons.submit });
      await user.click(submitButton);

      // Wait for success message and close button
      await waitFor(() => {
        const closeButton = screen.getByRole('button', { name: koMessages.form.buttons.close });
        expect(closeButton).toBeInTheDocument();
      });
    });
  });

  describe('Cancel Button', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      it(`should call onClose when cancel button clicked in ${locale}`, async () => {
        const user = userEvent.setup();
        renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);

        const cancelButton = screen.getByRole('button', { name: messages.form.buttons.cancel });
        await user.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Close Icon Button', () => {
    Object.entries(allMessages).forEach(([locale, messages]) => {
      it(`should call onClose when X button clicked in ${locale}`, async () => {
        const user = userEvent.setup();
        renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, locale, messages);

        // Find the close button by its text content (✕)
        const closeButtons = screen.getAllByText('✕');
        await user.click(closeButtons[0]);

        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('Form Field Validation', () => {
    it('should require first name in Thai', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, 'th', thMessages);

      const firstNameInput = screen.getByLabelText(thMessages.form.fields.firstName.required);
      expect(firstNameInput).toBeRequired();
    });

    it('should require email in Arabic', async () => {
      const user = userEvent.setup();
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, 'ar', arMessages);

      const emailInput = screen.getByLabelText(arMessages.form.fields.email.required);
      expect(emailInput).toBeRequired();
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    it('should require phone for quote form in English', async () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />);

      const phoneInput = screen.getByLabelText(enMessages.form.fields.phone.required);
      expect(phoneInput).toBeRequired();
    });

    it('should not require phone for demo form in Japanese', async () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, 'ja', jaMessages);

      const phoneInput = screen.getByLabelText(jaMessages.form.fields.phone.label);
      expect(phoneInput).not.toBeRequired();
    });

    it('should require message for contact form in Korean', async () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="contact" />, 'ko', koMessages);

      const messageInput = screen.getByLabelText(koMessages.form.fields.message.required);
      expect(messageInput).toBeRequired();
    });

    it('should not require message for demo form in Thai', async () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="demo" />, 'th', thMessages);

      const messageInput = screen.getByLabelText(thMessages.form.fields.message.label);
      expect(messageInput).not.toBeRequired();
    });
  });

  describe('Estimated TAK Users Options', () => {
    it('should render all user range options in English', () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />);

      expect(screen.getByText(enMessages.form.options.estimatedTakUsers.range1)).toBeInTheDocument();
      expect(screen.getByText(enMessages.form.options.estimatedTakUsers.range2)).toBeInTheDocument();
      expect(screen.getByText(enMessages.form.options.estimatedTakUsers.range3)).toBeInTheDocument();
      expect(screen.getByText(enMessages.form.options.estimatedTakUsers.range4)).toBeInTheDocument();
    });
  });

  describe('Deployment Timeline Options', () => {
    it('should render all timeline options in Arabic', () => {
      renderWithIntl(<RequestDemoForm onClose={mockOnClose} formType="quote" />, 'ar', arMessages);

      expect(screen.getByText(arMessages.form.options.takDeploymentTimeline.immediate)).toBeInTheDocument();
      expect(screen.getByText(arMessages.form.options.takDeploymentTimeline.shortTerm)).toBeInTheDocument();
      expect(screen.getByText(arMessages.form.options.takDeploymentTimeline.mediumTerm)).toBeInTheDocument();
      expect(screen.getByText(arMessages.form.options.takDeploymentTimeline.longTerm)).toBeInTheDocument();
    });
  });
});
