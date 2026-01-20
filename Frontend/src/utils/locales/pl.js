const pl = {
// Zarządzanie rozdziałami (ManageChaptersPage.jsx)
	manageChapters: {
	  title: "Zarządzaj rozdziałami",
	  novel: "Powieść",
	  addChapter: "Dodaj rozdział",
	  importFromEpub: "Importuj z EPUB",
	  chapter: "Rozdział",
	  chapterTitle: "Tytuł",
	  status: "Status",
	  reads: "Odczyty",
	  words: "Słowa",
	  updated: "Zaktualizowane",
	  actions: "Akcje",
	  noChapters: "Brak dostępnych rozdziałów.",
	  createFirstChapter: "Utwórz swój pierwszy rozdział",
	  importEpub: "Importuj EPUB",
	  importDialogTitle: "Importuj rozdziały z EPUB",
	  selectEpubFile: "Wybierz plik EPUB",
	  dragAndDrop: "Przeciągnij i upuść plik tutaj lub kliknij, aby wybrać",
	  selectFile: "Wybierz plik",
	  importOptions: "Opcje importu",
	  overwriteExisting: "Nadpisz istniejące rozdziały",
	  importAsDrafts: "Importuj jako szkice",
	  cancel: "Anuluj",
	  importing: "Importowanie...",
	  import: "Importuj",
	  importSuccess: "Import zakończony pomyślnie!",
	  importStats: "Zaimportowano {imported} z {total} rozdziałów",
	  importFailed: "Import nie powiódł się. Spróbuj ponownie.",
	  invalidFile: "Nieprawidłowy plik. Proszę wybrać prawidłowy plik EPUB.",
	  close: "Zamknij",
	  viewDetailsAndErrors: "Zobacz szczegóły i błędy",
	  errorsList: "Lista błędów",
	  errorInChapter: "Błąd w rozdziale {chapter}: {error}"
	},
    // Strona tworzenia powieści (CreateNovelPage.jsx)
    createNovelPage: {
      title: "Stwórz nową powieść",
      titleLabel: "Tytuł",
      captivatingTitle: "Wprowadź intrygujący tytuł",
      maxChars: "Maksymalnie {max} znaków",
      description: "Opis",
      writeDescription: "Napisz wciągający opis Twojej powieści",
      charsCount: "{current}/{max} znaków",
      genres: "Gatunki",
      selectUpTo: "(Wybierz do 5)",
      selectAtLeastOne: "Wybierz co najmniej jeden gatunek",
      tags: "Tagi",
      optional: "(Opcjonalne, do 10)",
      addTag: "Dodaj tag",
      tagsHelp: "Tagi pomagają czytelnikom znaleźć Twoją powieść (maks. {max} znaków na tag)",
      status: "Status",
      ongoing: "W toku",
      completed: "Zakończona",
      coverImage: "Okładka (Opcjonalna)",
      coverHelp: "Dobra okładka może przyciągnąć więcej czytelników. Zalecany rozmiar: 600x900 pikseli.",
      cancel: "Anuluj",
      creating: "Tworzenie...",
      create: "Stwórz powieść",
      selectGenreError: "Wybierz co najmniej jeden gatunek",
      maxGenresError: "Możesz wybrać maksymalnie {max} gatunków",
      tagExists: "Ten tag już istnieje",
      maxTagsError: "Możesz dodać maksymalnie {max} tagów",
      createFailed: "Nie udało się utworzyć powieści. Spróbuj ponownie."
    },
    // Nagłówek (Header.jsx)
    header: {
      home: "Strona główna",
      browse: "Przeglądaj",
      library: "Biblioteka",
      dashboard: "Panel autora",
      searchPlaceholder: "Szukaj powieści...",
      profile: "Profil",
      myNovels: "Moje powieści",
      admin: "Admin",
      logout: "Wyloguj się",
      login: "Zaloguj się",
      register: "Zarejestruj się"
    },

    // Układ administratora (AdminLayout.jsx)
    adminLayout: {
      title: "Admin",
      overview: "Przegląd",
      users: "Użytkownicy",
      novels: "Powieści",
      comments: "Komentarze"
    },

    // Stopka (Footer.jsx)
    footer: {
      description: "Platforma do udostępniania, odkrywania i czytania powieści internetowych. Dołącz do naszej społeczności autorów i czytelników.",
      resources: "Zasoby",
      genres: "Gatunki",
      trending: "Popularne",
      authors: "Autorzy",
      startWriting: "Zacznij pisać",
      guidelines: "Wytyczne",
      faq: "FAQ",
      legal: "Informacje prawne",
      privacyPolicy: "Polityka prywatności",
      termsConditions: "Warunki korzystania",
      allRightsReserved: "Wszelkie prawa zastrzeżone. Wykonane z",
      by: "przez studentów UMK."
    },

    // Strona główna (HomePage.jsx)
    homePage: {
      heroTitle: "Odkryj Niekończące się Historie",
      heroDescription: "Czytaj, pisz i udostępniaj oryginalne historie na Opowiadamy. Znajdź swoją następną ulubioną lekturę lub podziel się własną twórczością.",
      exploreStories: "Przeglądaj historie",
      startWriting: "Zacznij pisać",
      popularStories: "Popularne teraz",
      recentUpdates: "Ostatnio dodane",
      viewAll: "Zobacz wszystkie",
      loadingStories: "Ładowanie historii...",
	  "featured": "Wyróżnione",
      "readNow": "Czytaj teraz",
      "read": "Czytaj",
      "stories": "historie",
      "explore": "Przeglądaj",
      "defaultWriterBio": "Utalentowany gawędziarz tworzący wciągające narracje.",
      "novels": "powieści",
      "viewProfile": "Zobacz profil",
      "featuredStory": "Wyróżniona historia",
      "exploreGenres": "Przeglądaj gatunki",
      "viewAllGenres": "Zobacz wszystkie gatunki",
      "siteStats": "Statystyki strony",
      "totalReads": "Wszystkie odczyty",
      "totalStories": "Wszystkie historie",
      "activeAuthors": "Aktywni autorzy",
      "communityMembers": "Członkowie społeczności",
      "topWriters": "Najlepsi autorzy",
      "readerTestimonials": "Opinie czytelników",
      "testimonial1": {
          "quote": "Opowiadamy całkowicie zmieniło moje doświadczenie czytelnicze. Różnorodność historii jest niesamowita i odkryłem tak wielu utalentowanych autorów, których nie znalazłbym nigdzie indziej.",
          "author": "Marta C.",
          "role": "Zapamiętały czytelnik"
      },
      "testimonial2": {
          "quote": "Jako pisarz znalazłem tu niesamowitą społeczność. System informacji zwrotnej pomógł mi się rozwinąć, a obserwowanie, jak codziennie rośnie liczba moich czytelników, jest niezwykle motywujące..",
          "author": "Adam P.",
          "role": "Autor fantasy"
      },
      "testimonial3": {
          "quote": "Kosmiczny wygląd tej platformy sprawia, że czytanie przypomina podróż przez gwiazdy. Szczególnie podoba mi się kolekcja science fiction – nie ma sobie równych nigdzie indziej w Internecie..",
          "author": "Karolina W.",
          "role": "Entuzjastka science fiction"
      },
      "startWritingJourneyTitle": "Rozpocznij swoją przygodę z pisaniem już dziś",
      "startWritingJourneyDescription": "Dołącz do naszej społeczności pisarzy i dziel się swoimi historiami z czytelnikami na całym świecie. Uwolnij swoją kreatywność i zbuduj własne uniwersum literackie.",
      "goToDashboard": "Przejdź do panelu",
      "startWritingCta": "Zacznij pisać"
    },
// Szczegóły powieści (NovelDetailsPage.jsx)
    novelDetails: {
      loadError: "Nie udało się załadować powieści. Spróbuj ponownie później.",
      loadingDetails: "Ładowanie szczegółów powieści...",
      by: "autor",
      chapters: "rozdziałów",
      views: "wyświetleń",
      updated: "Zaktualizowano",
      startReading: "Rozpocznij czytanie",
      inLibrary: "W bibliotece",
      addToLibrary: "Dodaj do biblioteki",
      rate: "Oceń",
      editNovel: "Edytuj powieść",
      yourRating: "Twoja ocena",
      synopsis: "Streszczenie",
      manageChapters: "Zarządzaj rozdziałami",
      addChapter: "Dodaj rozdział",
      aboutAuthor: "O autorze",
      anonymous: "Anonimowy",
      noBioAvailable: "Brak dostępnego bio",
      novel: "Powieść",
      novels: "Powieści",
      rating: "Ocena",
      visitAuthorProfile: "Odwiedź profil autora",
      novelStatus: "Status powieści",
      status: "Status",
      ongoing: "W toku",
      completed: "Zakończona",
      unknown: "Nieznany",
      totalChapters: "Wszystkie rozdziały",
      published: "Opublikowano",
      tags: "Tagi"
    },
    // Strona logowania (LoginPage.jsx)
    loginPage: {
      title: "Zaloguj się do Opowiadamy",
      email: "Email",
      password: "Hasło",
      signIn: "Zaloguj się",
      signingIn: "Logowanie...",
      forgotPassword: "Zapomniałeś hasła?",
      noAccount: "Nie masz konta?",
      signUp: "Zarejestruj się",
      fillAllFields: "Wypełnij wszystkie pola",
      loginFailed: "Logowanie nie powiodło się. Sprawdź swoje dane."
    },

    // Strona rejestracji (RegisterPage.jsx)
    registerPage: {
      title: "Utwórz konto",
      username: "Nazwa użytkownika",
      email: "Email",
      password: "Hasło",
      confirmPassword: "Potwierdź hasło",
      dateOfBirth: "Data urodzenia",
      required: "*",
      createAccount: "Utwórz konto",
      creatingAccount: "Tworzenie konta...",
      haveAccount: "Masz już konto?",
      signIn: "Zaloguj się",
      publicDisplayName: "To będzie Twoja publiczna nazwa wyświetlana",
      atLeast8Chars: "Musi zawierać co najmniej 8 znaków",
      atLeast13Years: "Musisz mieć co najmniej 13 lat, aby się zarejestrować",
      registerSuccess: "Rejestracja zakończona pomyślnie! Zaloguj się na swoje nowe konto.",
      registerFailed: "Rejestracja nie powiodła się. Spróbuj ponownie.",
      validation: {
        usernameRequired: "Nazwa użytkownika jest wymagana",
        usernameLength: "Nazwa użytkownika musi mieć co najmniej 3 znaki",
        usernameMaxLength: "Nazwa użytkownika nie może przekraczać 20 znaków",
        emailRequired: "Email jest wymagany",
        emailInvalid: "Nieprawidłowy adres email",
        passwordRequired: "Hasło jest wymagane",
        passwordLength: "Hasło musi mieć co najmniej 8 znaków",
        passwordsDoNotMatch: "Hasła nie pasują do siebie",
        dobRequired: "Data urodzenia jest wymagana",
        dobAge: "Musisz mieć co najmniej 13 lat, aby się zarejestrować"
      }
    },

    // Strona resetowania hasła (ForgotPasswordPage.jsx)
    forgotPasswordPage: {
      title: "Zresetuj hasło",
      description: "Wprowadź swój adres email, a wyślemy Ci link do zresetowania hasła.",
      email: "Adres email",
      sendResetLink: "Wyślij link resetujący",
      sending: "Wysyłanie...",
      backToLogin: "Powrót do logowania",
      emailSent: "Email wysłany!",
      checkEmailTitle: "Sprawdź swoją skrzynkę pocztową",
      checkEmailDescription: "Jeśli konto z tym adresem email istnieje, wysłaliśmy link do zresetowania hasła.",
      didntReceive: "Nie otrzymałeś emaila?",
      resendLink: "Wyślij ponownie",
      emailRequired: "Adres email jest wymagany",
      emailInvalid: "Nieprawidłowy adres email",
      requestFailed: "Nie udało się wysłać linku resetującego. Spróbuj ponownie."
    },

    // Strona resetowania hasła (ResetPasswordPage.jsx)
    resetPasswordPage: {
      title: "Ustaw nowe hasło",
      description: "Wprowadź nowe hasło dla swojego konta.",
      newPassword: "Nowe hasło",
      confirmPassword: "Potwierdź nowe hasło",
      resetPassword: "Zresetuj hasło",
      resetting: "Resetowanie...",
      backToLogin: "Powrót do logowania",
      passwordResetSuccess: "Hasło zostało pomyślnie zresetowane!",
      successDescription: "Możesz się teraz zalogować używając nowego hasła.",
      goToLogin: "Przejdź do logowania",
      passwordRequired: "Hasło jest wymagane",
      passwordLength: "Hasło musi mieć co najmniej 8 znaków",
      passwordPattern: "Hasło musi zawierać co najmniej jedną wielką literę, jedną małą literę i jedną cyfrę",
      passwordsDoNotMatch: "Hasła nie pasują do siebie",
      invalidToken: "Nieprawidłowy lub wygasły token resetujący",
      resetFailed: "Nie udało się zresetować hasła. Spróbuj ponownie.",
      tokenExpired: "Link resetujący wygasł. Poproś o nowy link."
    },

    // Wspólne komunikaty
    common: {
      loading: "Ładowanie...",
      tryAgain: "Spróbuj ponownie",
      error: "Wystąpił błąd. Spróbuj ponownie później.",
      lastUpdated: "Ostatnia aktualizacja:",
      emailPlaceholder: "ty@przyklad.com",
      passwordPlaceholder: "••••••••",
      show: "Pokaż",
      hide: "Ukryj",
      add: "Dodaj",
      yes: "Tak",
      no: "Nie"
    },

    // Komponenty powieści (NovelCard.jsx)
    novel: {
      by: "autor",
      unknown: "Nieznany",
      noDescription: "Brak opisu",
      chapters: "rozdziały",
      chapter: "rozdział",
      views: "wyświetlenia"
    },

    // Panel autora (AuthorDashboardPage.jsx)
    authorDashboard: {
      title: "Panel autora",
      createNewNovel: "Stwórz nową powieść",
      authorStats: "Twoje statystyki autora",
      totalNovels: "Wszystkie powieści",
      totalViews: "Wszystkie wyświetlenia",
      avgRating: "Średnia ocena",
      ratings: "ocen",
      totalChapters: "Wszystkie rozdziały",
      totalWords: "Wszystkie słowa",
      chapterReads: "Przeczytane rozdziały",
      yourNovels: "Twoje powieści",
      loadingNovels: "Ładowanie twoich powieści...",
      noNovels: "Nie stworzyłeś jeszcze żadnych powieści.",
      createFirstNovel: "Stwórz swoją pierwszą powieść",
      novel: "Powieść",
      stats: "Statystyki",
      status: "Status",
      lastUpdated: "Ostatnia aktualizacja",
      actions: "Akcje",
      editNovel: "Edytuj powieść",
      manageChapters: "Zarządzaj rozdziałami",
      addChapter: "Dodaj rozdział",
      deleteNovel: "Usuń powieść",
      more: "więcej",
      confirmDelete: "Czy na pewno chcesz usunąć tę powieść? Tej operacji nie można cofnąć.",
      deleteFailed: "Nie udało się usunąć powieści. Spróbuj ponownie.",
      ongoing: "W toku",
      completed: "Zakończona",
      hiatus: "Wstrzymana"
    },

    // Panel administratora (AdminDashboardPage.jsx)
    adminDashboard: {
      title: "Panel",
      subtitle: "Witaj w centrum dowodzenia. Zarządzaj ekosystemem platformy z jednego miejsca.",
      modules: {
        users: {
          title: "Zarządzanie użytkownikami",
          description: "Kontroluj role użytkowników, monitoruj status oraz obsługuj blokady i przywracanie kont.",
          stats: "Zarządzaj kontami"
        },
        novels: {
          title: "Baza powieści",
          description: "Kuruj treści, wyróżniaj obiecujące historie i zarządzaj miękkimi/twardymi usunięciami.",
          stats: "Nadzoruj bibliotekę"
        },
        comments: {
          title: "Moderacja społeczności",
          description: "Dbaj o zasady społeczności, przeglądając, usuwając lub przywracając komentarze.",
          stats: "Przeglądaj dyskusje"
        }
      }
    },

    // Użytkownicy (AdminUsersPage.jsx)
    adminUsers: {
      title: "Użytkownicy",
      filters: {
        search: "Szukaj",
        status: "Status",
        role: "Rola",
        includeDeleted: "Uwzględnij usuniętych"
      },
      placeholders: {
        search: "nazwa użytkownika lub email"
      },
      options: {
        all: "Wszyscy"
      },
      table: {
        user: "Użytkownik",
        role: "Rola",
        status: "Status",
        created: "Utworzono",
        actions: "Akcje"
      },
      actions: {
        refresh: "Odśwież",
        restore: "Przywróć",
        block: "Zablokuj",
        unblock: "Odblokuj",
        softDelete: "Usuń (miękko)",
        hardDelete: "Usuń (na stałe)"
      },
      confirms: {
        blockUser: "Zablokować tego użytkownika?",
        unblockUser: "Odblokować tego użytkownika?",
        softDeleteUser: "Usunąć użytkownika (miękko)?",
        hardDeleteUser: "Usunąć użytkownika na stałe? Tej operacji nie można cofnąć.",
        restoreUser: "Przywrócić tego użytkownika?"
      },
      errors: {
        loadFailed: "Nie udało się załadować użytkowników",
        updateFailed: "Aktualizacja nie powiodła się",
        actionFailed: "Operacja nie powiodła się",
        deleteFailed: "Usuwanie nie powiodło się",
        restoreFailed: "Przywracanie nie powiodło się"
      },
      empty: "Nie znaleziono użytkowników.",
      pagination: {
        pageOf: "Strona {page} z {pages}",
        page: "Strona {page}",
        total: "Łącznie {total}",
        prev: "Wstecz",
        next: "Dalej"
      }
    },

    // Powieści (AdminNovelsPage.jsx)
    adminNovels: {
      title: "Powieści",
      filters: {
        search: "Szukaj",
        pageSize: "Rozmiar strony"
      },
      placeholders: {
        search: "tytuł"
      },
      table: {
        title: "Tytuł",
        author: "Autor",
        status: "Status",
        featured: "Wyróżnione",
        actions: "Akcje"
      },
      actions: {
        refresh: "Odśwież",
        feature: "Wyróżnij",
        unfeature: "Usuń wyróżnienie",
        softDelete: "Usuń (miękko)",
        hardDelete: "Usuń (na stałe)"
      },
      confirms: {
        softDeleteNovel: "Usunąć tę powieść (miękko)?",
        hardDeleteNovel: "Usunąć tę powieść i rozdziały na stałe? Tej operacji nie można cofnąć."
      },
      errors: {
        loadFailed: "Nie udało się załadować powieści",
        actionFailed: "Operacja nie powiodła się",
        deleteFailed: "Usuwanie nie powiodło się"
      },
      empty: "Nie znaleziono powieści.",
      pagination: {
        pageOf: "Strona {page} z {pages}",
        page: "Strona {page}",
        total: "Łącznie {total}",
        prev: "Wstecz",
        next: "Dalej"
      }
    },

    // Komentarze (AdminCommentsPage.jsx)
    adminComments: {
      title: "Komentarze",
      filters: {
        search: "Szukaj",
        novelId: "ID powieści",
        authorId: "ID autora",
        deleted: "Usunięte"
      },
      placeholders: {
        search: "treść",
        novelId: "novelId",
        authorId: "authorId"
      },
      options: {
        all: "Wszystkie",
        deleted: "Usunięte",
        notDeleted: "Nieusunięte"
      },
      table: {
        content: "Treść",
        author: "Autor",
        novel: "Powieść",
        deleted: "Usunięte",
        actions: "Akcje"
      },
      actions: {
        refresh: "Odśwież",
        restore: "Przywróć",
        softDelete: "Usuń (miękko)",
        hardDelete: "Usuń (na stałe)"
      },
      confirms: {
        softDeleteComment: "Usunąć komentarz (miękko)?",
        hardDeleteComment: "Usunąć komentarz i odpowiedzi na stałe? Tej operacji nie można cofnąć.",
        restoreComment: "Przywrócić ten komentarz?"
      },
      errors: {
        loadFailed: "Nie udało się załadować komentarzy",
        deleteFailed: "Usuwanie nie powiodło się",
        restoreFailed: "Przywracanie nie powiodło się"
      },
      empty: "Nie znaleziono komentarzy.",
      pagination: {
        pageOf: "Strona {page} z {pages}",
        page: "Strona {page}",
        total: "Łącznie {total}",
        prev: "Wstecz",
        next: "Dalej"
      }
    },

    // Biblioteka (LibraryPage.jsx)
    library: {
      title: "Moja biblioteka",
      loadingLibrary: "Ładowanie biblioteki...",
      emptyLibrary: "Twoja biblioteka jest pusta. Zacznij dodawać powieści, aby śledzić swoje czytanie!",
      emptyCategory: "Nie masz żadnych powieści w liście \"{category}\".",
      browseNovels: "Przeglądaj powieści",
      all: "Wszystkie",
      willRead: "Chcę przeczytać",
      reading: "Czytam",
      completed: "Zakończone",
      onHold: "Wstrzymane",
      dropped: "Porzucone",
      lastRead: "Ostatnio przeczytane: Rozdz.",
      changeStatus: "Zmień status",
      removeFromLibrary: "Usuń z biblioteki",
      continueReading: "Kontynuuj czytanie",
      startReading: "Zacznij czytanie",
      viewNovel: "Zobacz powieść"
    },

    // Strona przeglądania (BrowsePage.jsx)
    browsePage: {
      title: "Przeglądaj powieści",
      filters: "Filtry",
      reset: "Resetuj",
      searchPlaceholder: "Szukaj powieści...",
      genre: "Gatunek",
      allGenres: "Wszystkie gatunki",
      status: "Status",
      allStatuses: "Wszystkie statusy",
      sortBy: "Sortuj według",
      order: "Kolejność",
      descending: "Malejąco",
      ascending: "Rosnąco",
      resetFilters: "Resetuj filtry",
      applyFilters: "Zastosuj filtry",
      activeFilters: "Aktywne filtry:",
      search: "Wyszukiwanie",
      sort: "Sortowanie",
      loadingNovels: "Ładowanie powieści...",
      noNovelsFound: "Nie znaleziono powieści spełniających kryteria wyszukiwania.",
      previous: "Poprzednia",
      next: "Następna",
      genres: {
        fantasy: "Fantasy",
        scienceFiction: "Science Fiction",
        mystery: "Kryminał",
        thriller: "Thriller",
        romance: "Romans",
        horror: "Horror",
        adventure: "Przygodowa",
        historical: "Historyczna",
        drama: "Dramat",
        comedy: "Komedia"
      },
      statuses: {
        ongoing: "W toku",
        completed: "Zakończona",
        hiatus: "Wstrzymana"
      },
      sortOptions: {
        recentlyAdded: "Ostatnio dodane",
        recentlyUpdated: "Ostatnio zaktualizowane",
        mostViewed: "Najczęściej oglądane",
        highestRated: "Najwyżej oceniane",
        chapterCount: "Liczba rozdziałów"
      }
    },

    // Strona rozdziału (ChapterPage.jsx)
    chapterPage: {
      loadingChapter: "Ładowanie rozdziału...",
      chapterDataNotAvailable: "Dane rozdziału nie są dostępne",
      backToNovel: "Powrót do powieści",
      readingSettings: "Ustawienia czytania",
      fontSize: "Rozmiar czcionki",
      lineHeight: "Odstępy między wierszami",
      fontFamily: "Rodzaj czcionki",
      sansSerif: "Bezszeryfowa",
      serif: "Szeryfowa",
      monospace: "Monospace",
      theme: "Motyw",
      light: "Jasny",
      dark: "Ciemny",
      close: "Zamknij",
      previous: "Poprzedni",
      next: "Następny",
      chapters: "Rozdziały",
      chapter: "Rozdział"
    },

    // Strona kontaktowa (ContactPage.jsx)
    contactPage: {
      title: "Kontakt",
      contactInfo: "Informacje kontaktowe",
      email: "Email",
      phone: "Telefon",
      address: "Adres",
      followUs: "Obserwuj nas",
      sendMessage: "Wyślij nam wiadomość",
      messageSent: "Wiadomość wysłana!",
      thankYou: "Dziękujemy za kontakt. Odezwiemy się najszybciej jak to możliwe.",
      sendAnother: "Wyślij kolejną wiadomość",
      yourName: "Twoje imię",
      emailAddress: "Adres email",
      subject: "Temat",
      message: "Wiadomość",
      requiredFields: "Wymagane pola",
      sending: "Wysyłanie...",
      send: "Wyślij wiadomość",
      placeholders: {
        name: "Jan Kowalski",
        email: "jankowalski@przyklad.pl",
        subject: "W czym możemy pomóc?",
        message: "Twoja wiadomość tutaj..."
      }
    },

    // Strona tworzenia rozdziału (CreateChapterPage.jsx)
    createChapterPage: {
      title: "Dodaj nowy rozdział",
      novel: "Powieść",
      chapterNumber: "Numer rozdziału",
      chapterTitle: "Tytuł rozdziału",
      chapterContent: "Treść rozdziału",
      status: "Status",
      draft: "Szkic",
      published: "Opublikowany",
      draftInfo: "Rozdziały w formie szków są widoczne tylko dla Ciebie do momentu opublikowania",
      minimumChars: "Wymagane minimum 100 znaków",
      titlePlaceholder: "Wprowadź tytuł rozdziału",
      contentPlaceholder: "Napisz treść swojego rozdziału tutaj...",
      cancel: "Anuluj",
      saving: "Zapisywanie...",
      saveChapter: "Zapisz rozdział",
      contentLengthError: "Treść rozdziału musi mieć co najmniej 100 znaków.",
      saveFailed: "Nie udało się utworzyć rozdziału. Spróbuj ponownie.",
      loadingNovel: "Ładowanie danych powieści..."
    },

    // Przełącznik języka (LanguageSwitcher.jsx)
    languageSwitcher: {
      changeLanguageAria: "Zmień język"
    },

    // Strona edycji powieści (EditNovelPage.jsx)
    editNovelPage: {
      title: "Edytuj Powieść",
      loadFailed: "Nie udało się załadować danych powieści",
      loadFailedLater: "Nie udało się załadować danych powieści. Spróbuj ponownie później.",
      maxGenresAlert: "Możesz wybrać maksymalnie {max} gatunków",
      tagExistsAlert: "Ten tag już istnieje",
      maxTagsAlert: "Możesz dodać maksymalnie {max} tagów",
      selectGenreError: "Wybierz przynajmniej jeden gatunek",
      updateFailed: "Nie udało się zaktualizować powieści. Spróbuj ponownie.",
      tagsHelp: "Tagi pomagają czytelnikom znaleźć twoją powieść (maksymalnie {max} znaków na tag)",
      saving: "Zapisywanie...",
      saveChanges: "Zapisz Zmiany"
    },

    // Strona edycji rozdziału (EditChapterPage.jsx)
    editChapterPage: {
      title: "Edytuj Rozdział {chapterNumber}",
      novelLabel: "Powieść:",
      loadChapterFailed: "Nie udało się załadować danych rozdziału",
      loadNovelFailed: "Nie udało się załadować danych powieści",
      loadFailedLater: "Nie udało się załadować danych. Spróbuj ponownie później.",
      updateFailed: "Nie udało się zaktualizować rozdziału. Spróbuj ponownie."
    },

    // Profil (ProfilePage.jsx)
    profilePage: {
      title: "Twój Profil",
      username: "Nazwa użytkownika",
      email: "Email",
      dateOfBirth: "Data urodzenia",
      changePassword: "Zmień hasło",
      currentPassword: "Obecne hasło",
      newPassword: "Nowe hasło",
      confirmNewPassword: "Potwierdź nowe hasło",
      passwordMinLength: "Hasło musi mieć co najmniej 8 znaków",
      passwordsDoNotMatch: "Hasła nie są zgodne",
      newPasswordsMismatch: "Nowe hasła nie są zgodne",
      currentPasswordRequired: "Obecne hasło jest wymagane przy zmianie hasła",
      updatedSuccess: "Profil zaktualizowano pomyślnie",
      noChanges: "Nie wprowadzono żadnych zmian",
      updateFailed: "Nie udało się zaktualizować profilu",
      logout: "Wyloguj się",
      saving: "Zapisywanie...",
      saveChanges: "Zapisz zmiany"
    },

    // Komentarze (CommentSection.jsx / Comment.jsx / CommentForm.jsx)
    comments: {
      title: "Dyskusja",
      countOne: "komentarz",
      countMany: "komentarzy",
      signInToJoin: "Zaloguj się, aby dołączyć do dyskusji",
      signIn: "Zaloguj się",
      emptyState: "Jeszcze nikt nie skomentował. Bądź pierwszy!",
      loadFailed: "Nie udało się załadować komentarzy",
      loadFailedLater: "Nie udało się załadować komentarzy. Spróbuj ponownie później.",
      deleteFailed: "Nie udało się usunąć komentarza. Spróbuj ponownie.",
      loadMore: "Załaduj więcej komentarzy",
      loading: "Ładowanie...",
      anonymous: "Anonim",
      anonymousInitial: "?",
      reply: "Odpowiedz",
      edit: "Edytuj",
      delete: "Usuń",
      confirmDelete: "Czy na pewno chcesz usunąć ten komentarz?",
      showReplies: "Pokaż odpowiedzi ({count})",
      hideReplies: "Ukryj odpowiedzi",
      noReplies: "Brak odpowiedzi.",
      replyPlaceholder: "Napisz odpowiedź...",
      formPlaceholder: "Napisz coś...",
      cancel: "Anuluj",
      emptyError: "Komentarz nie może być pusty",
      tooLongError: "Komentarz jest za długi (maksymalnie 1000 znaków)",
      submitFailed: "Nie udało się wysłać komentarza. Spróbuj ponownie.",
      submitting: "Wysyłanie...",
      saving: "Zapisywanie...",
      send: "Wyślij",
      charCount: "{current}/1000 znaków"
    },

    // FAQ (FAQPage.jsx)
    faqPage: {
      title: "Najczęściej Zadawane Pytania",
      categories: {
        general: "Ogólne",
        reading: "Czytanie",
        writing: "Pisanie",
        accountSupport: "Konto i Wsparcie"
      },
      stillHaveQuestionsTitle: "Nadal masz pytania?",
      stillHaveQuestionsDescription: "Jeśli nie znalazłeś(-aś) odpowiedzi na swoje pytanie, skontaktuj się z nami.",
      contactSupport: "Skontaktuj się z pomocą"
    },

    // Warunki (TermsPage.jsx)
    termsPage: {
      title: "Warunki korzystania"
    },

    // Prywatność (PrivacyPage.jsx)
    privacyPage: {
      title: "Polityka prywatności"
    },

    // Wytyczne (GuidelinesPage.jsx)
    guidelinesPage: {
      title: "Wytyczne dla autorów"
    },

    // Strona autora (AuthorPage.jsx)
    authorPage: {
      loadFailedLater: "Nie udało się wczytać danych autora. Spróbuj ponownie później.",
      loadingProfile: "Ładowanie profilu autora...",
      tryAgain: "Spróbuj ponownie",
      unknownAuthor: "Nieznany autor",
      novelsCountOne: "Powieść",
      novelsCountFew: "Powieści",
      novelsCountMany: "Powieści",
      averageRating: "Średnia ocena",
      memberSince: "Członek od {date}",
      novelsBy: "Powieści autorstwa {author}",
      novelsByFallback: "tego autora",
      noNovelsBy: "Nie znaleziono powieści autorstwa {author}",
      noNovelsYet: "Ten autor nie opublikował jeszcze żadnych powieści.",
      browseOtherNovels: "Przeglądaj inne powieści"
    },

    // Lista rozdziałów (ChapterList.jsx)
    chapterList: {
      title: "Rozdziały",
      confirmDelete: "Czy na pewno chcesz usunąć Rozdział {chapterNumber}? Tej operacji nie można cofnąć.",
      deleteFailed: "Nie udało się usunąć rozdziału. Spróbuj ponownie.",
      views: "wyświetleń",
      words: "słów",
      published: "Opublikowany",
      draft: "Szkic",
      editChapter: "Edytuj Rozdział",
      deleteChapter: "Usuń Rozdział",
      noChapters: "Brak dostępnych rozdziałów.",
      addFirstChapter: "Dodaj swój pierwszy rozdział"
    },

    // Wgrywanie obrazu (ImageUploader.jsx)
    imageUploader: {
      defaultLabel: "Okładka",
      invalidFileType: "Wybierz plik obrazu (JPG, PNG itd.)",
      previewAlt: "Podgląd",
      dropHere: "Upuść obraz tutaj lub",
      browse: "przeglądaj",
      helper: "PNG, JPG, GIF do 5MB"
    },

    // Edytory tekstu
    richTextEditor: {
      defaultPlaceholder: "Napisz coś...",
      loading: "Ładowanie edytora..."
    },

    // Footer (Footer.jsx)
    footerSrOnly: {
      twitter: "Strona Twitter",
      github: "GitHub"
    },

    // Drobne etykiety UI
    ui: {
      readerSettingsAria: "Ustawienia czytania",
      optionsAria: "Opcje",
      toggleFiltersAria: "Pokaż/ukryj filtry"
    },

    // Manage chapters page extra action titles
    manageChaptersPage: {
      editChapterTitle: "Edytuj rozdział",
      viewChapterTitle: "Zobacz rozdział",
      deleteChapterTitle: "Usuń rozdział",
      deleteFailed: "Nie udało się usunąć rozdziału. Spróbuj ponownie.",
      loadChaptersFailed: "Nie udało się załadować rozdziałów",
      loadNovelFailed: "Nie udało się załadować danych powieści",
      loadFailedLater: "Nie udało się załadować danych. Spróbuj ponownie później.",
      confirmDelete: "Czy na pewno chcesz usunąć Rozdział {chapterNumber}? Tej operacji nie można cofnąć."
    }
};

export default pl;
