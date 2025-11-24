import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import CookieNotice from '@/components/CookieNotice';
import enMessages from '@/messages/en.json';
import jaMessages from '@/messages/ja.json';
import thMessages from '@/messages/th.json';
import koMessages from '@/messages/ko.json';
import arMessages from '@/messages/ar.json';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('CookieNotice Component', () => {
  const renderWithIntl = (locale: string, messages: typeof enMessages) => {
    return render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <CookieNotice />
      </NextIntlClientProvider>
    );
  };

  const renderAndWait = async (locale: string, messages: typeof enMessages) => {
    const result = renderWithIntl(locale, messages);
    await act(async () => {
      jest.advanceTimersByTime(1000);
    });
    return result;
  };

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  describe('Visibility Logic', () => {
    it('should not be visible initially (before timeout)', () => {
      renderWithIntl('en', enMessages);
      const banner = screen.queryByText(/This site uses cookies/i);
      expect(banner).not.toBeInTheDocument();
    });

    it('should become visible after 1 second delay', async () => {
      renderWithIntl('en', enMessages);

      // Fast-forward time by 1 second
      await act(async () => {
        jest.advanceTimersByTime(1000);
      });

      await waitFor(() => {
        expect(screen.getByText(/This site uses cookies/i)).toBeInTheDocument();
      });
    });

    it('should not show if user has already accepted cookies', () => {
      localStorageMock.setItem('nerv-cookie-consent', 'accepted');
      renderWithIntl('en', enMessages);

      jest.advanceTimersByTime(1000);

      const banner = screen.queryByText(/This site uses cookies/i);
      expect(banner).not.toBeInTheDocument();
    });

    it('should not show if user has already declined cookies', () => {
      localStorageMock.setItem('nerv-cookie-consent', 'declined');
      renderWithIntl('en', enMessages);

      jest.advanceTimersByTime(1000);

      const banner = screen.queryByText(/This site uses cookies/i);
      expect(banner).not.toBeInTheDocument();
    });
  });

  describe('Translation Support - English', () => {
    beforeEach(async () => {
      await renderAndWait('en', enMessages);
    });

    it('should display English notice label', () => {
      expect(screen.getByText('NOTICE:')).toBeInTheDocument();
    });

    it('should display English cookie message', () => {
      expect(screen.getByText(/This site uses cookies for language preferences, form functionality, and analytics/i)).toBeInTheDocument();
    });

    it('should display English Privacy Policy link', () => {
      const link = screen.getByRole('link', { name: /Privacy Policy/i });
      expect(link).toBeInTheDocument();
    });

    it('should display English Accept button', () => {
      expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();
    });

    it('should display English Decline button', () => {
      expect(screen.getByRole('button', { name: 'Decline' })).toBeInTheDocument();
    });

    it('should link to English privacy page with locale prefix', () => {
      const link = screen.getByRole('link', { name: /Privacy Policy/i });
      expect(link).toHaveAttribute('href', '/en/privacy');
    });
  });

  describe('Translation Support - Japanese', () => {
    beforeEach(async () => {
      await renderAndWait('ja', jaMessages);
    });

    it('should display Japanese notice label', () => {
      expect(screen.getByText('通知:')).toBeInTheDocument();
    });

    it('should display Japanese cookie message', () => {
      expect(screen.getByText(/このサイトは、フォーム機能と分析のためにCookieを使用しています/i)).toBeInTheDocument();
    });

    it('should display Japanese Privacy Policy link', () => {
      const link = screen.getByRole('link', { name: /プライバシーポリシー/i });
      expect(link).toBeInTheDocument();
    });

    it('should display Japanese Accept button', () => {
      expect(screen.getByRole('button', { name: '同意する' })).toBeInTheDocument();
    });

    it('should display Japanese Decline button', () => {
      expect(screen.getByRole('button', { name: '拒否する' })).toBeInTheDocument();
    });

    it('should link to Japanese privacy page (with locale prefix)', () => {
      const link = screen.getByRole('link', { name: /プライバシーポリシー/i });
      expect(link).toHaveAttribute('href', '/ja/privacy');
    });
  });

  describe('Translation Support - Thai', () => {
    beforeEach(async () => {
      await renderAndWait('th', thMessages);
    });

    it('should display Thai notice label', () => {
      expect(screen.getByText('ประกาศ:')).toBeInTheDocument();
    });

    it('should display Thai cookie message', () => {
      expect(screen.getByText(/เว็บไซต์นี้ใช้คุกกี้สำหรับฟังก์ชันฟอร์มและการวิเคราะห์/i)).toBeInTheDocument();
    });

    it('should display Thai Accept button', () => {
      expect(screen.getByRole('button', { name: 'ยอมรับ' })).toBeInTheDocument();
    });

    it('should display Thai Decline button', () => {
      expect(screen.getByRole('button', { name: 'ปฏิเสธ' })).toBeInTheDocument();
    });

    it('should link to Thai privacy page (with locale prefix)', () => {
      const link = screen.getByRole('link', { name: /นโยบายความเป็นส่วนตัว/i });
      expect(link).toHaveAttribute('href', '/th/privacy');
    });
  });

  describe('Translation Support - Korean', () => {
    beforeEach(async () => {
      await renderAndWait('ko', koMessages);
    });

    it('should display Korean notice label', () => {
      expect(screen.getByText('알림:')).toBeInTheDocument();
    });

    it('should display Korean cookie message', () => {
      expect(screen.getByText(/이 사이트는 양식 기능 및 분석을 위해 쿠키를 사용합니다/i)).toBeInTheDocument();
    });

    it('should display Korean Accept button', () => {
      expect(screen.getByRole('button', { name: '동의' })).toBeInTheDocument();
    });

    it('should display Korean Decline button', () => {
      expect(screen.getByRole('button', { name: '거부' })).toBeInTheDocument();
    });

    it('should link to Korean privacy page (with locale prefix)', () => {
      const link = screen.getByRole('link', { name: /개인정보 보호정책/i });
      expect(link).toHaveAttribute('href', '/ko/privacy');
    });
  });

  describe('Translation Support - Arabic', () => {
    beforeEach(async () => {
      await renderAndWait('ar', arMessages);
    });

    it('should display Arabic notice label', () => {
      expect(screen.getByText('إشعار:')).toBeInTheDocument();
    });

    it('should display Arabic cookie message', () => {
      expect(screen.getByText(/يستخدم هذا الموقع ملفات تعريف الارتباط لوظائف النماذج والتحليلات/i)).toBeInTheDocument();
    });

    it('should display Arabic Accept button', () => {
      expect(screen.getByRole('button', { name: 'قبول' })).toBeInTheDocument();
    });

    it('should display Arabic Decline button', () => {
      expect(screen.getByRole('button', { name: 'رفض' })).toBeInTheDocument();
    });

    it('should link to Arabic privacy page (with locale prefix)', () => {
      const link = screen.getByRole('link', { name: /سياسة الخصوصية/i });
      expect(link).toHaveAttribute('href', '/ar/privacy');
    });
  });

  describe('Accept Button Functionality', () => {
    it('should hide banner when Accept is clicked', async () => {
      await renderAndWait('en', enMessages);

      const acceptButton = screen.getByRole('button', { name: 'Accept' });
      fireEvent.click(acceptButton);

      await waitFor(() => {
        expect(screen.queryByText(/This site uses cookies/i)).not.toBeInTheDocument();
      });
    });

    it('should save accepted state to localStorage', async () => {
      await renderAndWait('en', enMessages);

      const acceptButton = screen.getByRole('button', { name: 'Accept' });
      fireEvent.click(acceptButton);

      expect(localStorageMock.getItem('nerv-cookie-consent')).toBe('accepted');
    });

    it('should work correctly in non-English languages', async () => {
      await renderAndWait('ja', jaMessages);

      const acceptButton = screen.getByRole('button', { name: '同意する' });
      fireEvent.click(acceptButton);

      expect(localStorageMock.getItem('nerv-cookie-consent')).toBe('accepted');
    });
  });

  describe('Decline Button Functionality', () => {
    it('should hide banner when Decline is clicked', async () => {
      await renderAndWait('en', enMessages);

      const declineButton = screen.getByRole('button', { name: 'Decline' });
      fireEvent.click(declineButton);

      await waitFor(() => {
        expect(screen.queryByText(/This site uses cookies/i)).not.toBeInTheDocument();
      });
    });

    it('should save declined state to localStorage', async () => {
      await renderAndWait('en', enMessages);

      const declineButton = screen.getByRole('button', { name: 'Decline' });
      fireEvent.click(declineButton);

      expect(localStorageMock.getItem('nerv-cookie-consent')).toBe('declined');
    });

    it('should work correctly in non-English languages', async () => {
      await renderAndWait('ko', koMessages);

      const declineButton = screen.getByRole('button', { name: '거부' });
      fireEvent.click(declineButton);

      expect(localStorageMock.getItem('nerv-cookie-consent')).toBe('declined');
    });
  });

  describe('Styling and Accessibility', () => {
    beforeEach(async () => {
      await renderAndWait('en', enMessages);
    });

    it('should apply tactical styling to notice label', () => {
      const notice = screen.getByText('NOTICE:');
      expect(notice).toHaveClass('font-mono');
      expect(notice).toHaveClass('text-tactical-accent');
    });

    it('should have both Accept and Decline buttons', () => {
      const acceptButton = screen.getByRole('button', { name: 'Accept' });
      const declineButton = screen.getByRole('button', { name: 'Decline' });

      expect(acceptButton).toBeInTheDocument();
      expect(declineButton).toBeInTheDocument();
    });

    it('should style Accept button with tactical accent background', () => {
      const acceptButton = screen.getByRole('button', { name: 'Accept' });
      expect(acceptButton).toHaveClass('bg-tactical-accent');
      expect(acceptButton).toHaveClass('text-black');
    });

    it('should style Decline button with tactical border', () => {
      const declineButton = screen.getByRole('button', { name: 'Decline' });
      expect(declineButton).toHaveClass('border');
      expect(declineButton).toHaveClass('border-tactical-accent/50');
      expect(declineButton).toHaveClass('text-tactical-accent');
    });

    it('should have accessible button labels', () => {
      const acceptButton = screen.getByRole('button', { name: 'Accept' });
      const declineButton = screen.getByRole('button', { name: 'Decline' });

      expect(acceptButton).toHaveAccessibleName('Accept');
      expect(declineButton).toHaveAccessibleName('Decline');
    });
  });

  describe('Privacy Policy Link', () => {
    it('should correctly route to localized privacy pages', async () => {
      // With localePrefix: 'always', all locales including English use locale prefix
      const testCases = [
        { locale: 'en', messages: enMessages, expectedHref: '/en/privacy' },
        { locale: 'ja', messages: jaMessages, expectedHref: '/ja/privacy' },
        { locale: 'th', messages: thMessages, expectedHref: '/th/privacy' },
        { locale: 'ko', messages: koMessages, expectedHref: '/ko/privacy' },
        { locale: 'ar', messages: arMessages, expectedHref: '/ar/privacy' },
      ];

      for (const { locale, messages, expectedHref } of testCases) {
        const { unmount } = await renderAndWait(locale, messages);

        const link = screen.getAllByRole('link')[0]; // Get the privacy link
        expect(link).toHaveAttribute('href', expectedHref);

        unmount();
        localStorageMock.clear();
      }
    });
  });
});
