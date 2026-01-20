const en = {
	// Chapter Management (ManageChaptersPage.jsx)
	manageChapters: {
	  title: "Manage Chapters",
	  novel: "Novel",
	  addChapter: "Add Chapter",
	  importFromEpub: "Import from EPUB",
	  chapter: "Chapter",
	  chapterTitle: "Title",
	  status: "Status",
	  reads: "Reads",
	  words: "Words",
	  updated: "Updated",
	  actions: "Actions",
	  noChapters: "No chapters available yet.",
	  createFirstChapter: "Create Your First Chapter",
	  importEpub: "Import EPUB",
	  importDialogTitle: "Import Chapters from EPUB",
	  selectEpubFile: "Select EPUB File",
	  dragAndDrop: "Drag and drop your file here or click to browse",
	  selectFile: "Select File",
	  importOptions: "Import Options",
	  overwriteExisting: "Overwrite existing chapters",
	  importAsDrafts: "Import as drafts",
	  cancel: "Cancel",
	  importing: "Importing...",
	  import: "Import",
	  importSuccess: "Import successful!",
	  importStats: "Imported {imported} out of {total} chapters",
	  importFailed: "Import failed. Please try again.",
	  invalidFile: "Invalid file. Please select a valid EPUB file.",
	  close: "Close",
	  viewDetailsAndErrors: "View details and errors",
	  errorsList: "Error list",
	  errorInChapter: "Error in chapter {chapter}: {error}"
	},
    // Create novel page (CreateNovelPage.jsx)
    createNovelPage: {
      title: "Create New Novel",
      titleLabel: "Title",
      captivatingTitle: "Enter a captivating title",
      maxChars: "Maximum {max} characters",
      description: "Description",
      writeDescription: "Write a compelling description of your novel",
      charsCount: "{current}/{max} characters",
      genres: "Genres",
      selectUpTo: "(Select up to {max})",
      selectAtLeastOne: "Please select at least one genre",
      tags: "Tags",
      optional: "(Optional, up to {max})",
      addTag: "Add a tag",
      tagsHelp: "Tags help readers find your novel (max {max} characters per tag)",
      status: "Status",
      ongoing: "Ongoing",
      completed: "Completed",
      coverImage: "Cover Image (Optional)",
      coverHelp: "A good cover image can attract more readers. Recommended size: 600x900 pixels.",
      cancel: "Cancel",
      creating: "Creating...",
      create: "Create Novel",
      selectGenreError: "Please select at least one genre",
      maxGenresError: "You can select up to {max} genres",
      tagExists: "This tag already exists",
      maxTagsError: "You can add up to {max} tags",
      createFailed: "Failed to create novel. Please try again."
    },
    // Header (Header.jsx)
    header: {
      home: "Home",
      browse: "Browse",
      library: "Library",
      dashboard: "Dashboard",
      searchPlaceholder: "Search novels...",
      profile: "Profile",
      myNovels: "My Novels",
      admin: "Admin",
      logout: "Logout",
      login: "Login",
      register: "Register"
    },

    // Admin layout (AdminLayout.jsx)
    adminLayout: {
      title: "Admin",
      overview: "Overview",
      users: "Users",
      novels: "Novels",
      comments: "Comments"
    },

    // Footer (Footer.jsx)
    footer: {
      description: "A platform for sharing, discovering, and reading web novels. Join our community of authors and readers.",
      resources: "Resources",
      genres: "Genres",
      trending: "Trending",
      authors: "Authors",
      startWriting: "Start Writing",
      guidelines: "Guidelines",
      faq: "FAQ",
      legal: "Legal",
      privacyPolicy: "Privacy Policy",
      termsConditions: "Terms & Conditions",
      allRightsReserved: "All Rights Reserved. Made with",
      by: "by UMK Students."
    },

    // Home page (HomePage.jsx)
    homePage: {
      heroTitle: "Discover Endless Stories",
      heroDescription: "Read, write, and share original stories on Opowiadamy. Find your next favorite read or share your own creative work.",
      exploreStories: "Explore Stories",
      startWriting: "Start Writing",
      popularStories: "Popular Now",
      recentUpdates: "Recently Added",
      viewAll: "View All",
      loadingStories: "Loading stories...",
      featured: "Featured",
      readNow: "Read Now",
      read: "Read",
      stories: "stories",
      explore: "Explore",
      defaultWriterBio: "A talented storyteller crafting captivating narratives.",
      novels: "novels",
      viewProfile: "View profile",
      featuredStory: "Featured story",
      exploreGenres: "Explore genres",
      viewAllGenres: "View all genres",
      siteStats: "Site stats",
      totalReads: "Total reads",
      totalStories: "Total stories",
      activeAuthors: "Active authors",
      communityMembers: "Community members",
      topWriters: "Top writers",
      readerTestimonials: "Reader testimonials",
      testimonial1: {
        quote: "Opowiadamy completely changed my reading experience. The variety of stories is incredible, and I've discovered so many talented authors I wouldn't have found anywhere else.",
        author: "Marta C.",
        role: "Avid reader"
      },
      testimonial2: {
        quote: "As a writer, I found an amazing community here. The feedback system helped me grow, and watching my readership increase every day is incredibly motivating.",
        author: "Adam P.",
        role: "Fantasy author"
      },
      testimonial3: {
        quote: "The cosmic look of this platform makes reading feel like a journey through the stars. I especially love the science fiction collection — it's unmatched anywhere else on the internet.",
        author: "Karolina W.",
        role: "Science fiction enthusiast"
      },
      startWritingJourneyTitle: "Start your writing journey today",
      startWritingJourneyDescription: "Join our community of writers and share your stories with readers worldwide. Unleash your creativity and build your own literary universe.",
      goToDashboard: "Go to dashboard",
      startWritingCta: "Start writing"
    },

    // Novel details (NovelDetailsPage.jsx)
    novelDetails: {
      loadError: "Failed to load the novel. Please try again later.",
      loadingDetails: "Loading novel details...",
      by: "by",
      chapters: "chapters",
      views: "views",
      updated: "Updated",
      startReading: "Start Reading",
      inLibrary: "In library",
      addToLibrary: "Add to Library",
      rate: "Rate",
      editNovel: "Edit Novel",
      yourRating: "Your rating",
      synopsis: "Synopsis",
      manageChapters: "Manage Chapters",
      addChapter: "Add Chapter",
      aboutAuthor: "About the author",
      anonymous: "Anonymous",
      noBioAvailable: "No bio available",
      novel: "Novel",
      novels: "Novels",
      rating: "Rating",
      visitAuthorProfile: "Visit author profile",
      novelStatus: "Novel status",
      status: "Status",
      ongoing: "Ongoing",
      completed: "Completed",
      unknown: "Unknown",
      totalChapters: "Total chapters",
      published: "Published",
      tags: "Tags"
    },

    // Login page (LoginPage.jsx)
    loginPage: {
      title: "Login to Opowiadamy",
      email: "Email",
      password: "Password",
      signIn: "Sign In",
      signingIn: "Signing in...",
      forgotPassword: "Forgot your password?",
      noAccount: "Don't have an account?",
      signUp: "Sign up",
      fillAllFields: "Please fill in all fields",
      loginFailed: "Failed to login. Please check your credentials."
    },

    // Register page (RegisterPage.jsx)
    registerPage: {
      title: "Create an Account",
      username: "Username",
      email: "Email",
      password: "Password",
      confirmPassword: "Confirm Password",
      dateOfBirth: "Date of Birth",
      required: "*",
      createAccount: "Create Account",
      creatingAccount: "Creating Account...",
      haveAccount: "Already have an account?",
      signIn: "Sign in",
      publicDisplayName: "This will be your public display name",
      atLeast8Chars: "Must be at least 8 characters",
      atLeast13Years: "You must be at least 13 years old to register",
      registerSuccess: "Registration successful! Please log in with your new account.",
      registerFailed: "Registration failed. Please try again.",
      validation: {
        usernameRequired: "Username is required",
        usernameLength: "Username must be at least 3 characters",
        usernameMaxLength: "Username cannot exceed 20 characters",
        emailRequired: "Email is required",
        emailInvalid: "Invalid email address",
        passwordRequired: "Password is required",
        passwordLength: "Password must be at least 8 characters",
        passwordsDoNotMatch: "Passwords do not match",
        dobRequired: "Date of birth is required",
        dobAge: "You must be at least 13 years old to register"
      }
    },

    // Forgot Password Page (ForgotPasswordPage.jsx)
    forgotPasswordPage: {
      title: "Reset Password",
      description: "Enter your email address and we'll send you a link to reset your password.",
      email: "Email Address",
      sendResetLink: "Send Reset Link",
      sending: "Sending...",
      backToLogin: "Back to Login",
      emailSent: "Email Sent!",
      checkEmailTitle: "Check your email",
      checkEmailDescription: "If an account with that email exists, we've sent a password reset link.",
      didntReceive: "Didn't receive the email?",
      resendLink: "Resend Link",
      emailRequired: "Email address is required",
      emailInvalid: "Invalid email address",
      requestFailed: "Failed to send reset link. Please try again."
    },

    // Reset Password Page (ResetPasswordPage.jsx)
    resetPasswordPage: {
      title: "Set New Password",
      description: "Enter a new password for your account.",
      newPassword: "New Password",
      confirmPassword: "Confirm New Password",
      resetPassword: "Reset Password",
      resetting: "Resetting...",
      backToLogin: "Back to Login",
      passwordResetSuccess: "Password Reset Successfully!",
      successDescription: "You can now log in with your new password.",
      goToLogin: "Go to Login",
      passwordRequired: "Password is required",
      passwordLength: "Password must be at least 8 characters",
      passwordPattern: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      passwordsDoNotMatch: "Passwords do not match",
      invalidToken: "Invalid or expired reset token",
      resetFailed: "Failed to reset password. Please try again.",
      tokenExpired: "Reset link has expired. Please request a new one."
    },

    // Common
    common: {
      loading: "Loading...",
      tryAgain: "Try Again",
      error: "An error occurred. Please try again later.",
      lastUpdated: "Last updated:",
      emailPlaceholder: "you@example.com",
      passwordPlaceholder: "••••••••",
      show: "Show",
      hide: "Hide",
      add: "Add",
      yes: "Yes",
      no: "No"
    },

    // Novel components (NovelCard.jsx)
    novel: {
      by: "by",
      unknown: "Unknown",
      noDescription: "No description available",
      chapters: "chapters",
      chapter: "chapter",
      views: "views"
    },

    // Author Dashboard (AuthorDashboardPage.jsx)
    authorDashboard: {
      title: "Author Dashboard",
      createNewNovel: "Create New Novel",
      authorStats: "Your Author Stats",
      totalNovels: "Total Novels",
      totalViews: "Total Views",
      avgRating: "Avg. Rating",
      ratings: "ratings",
      totalChapters: "Total Chapters",
      totalWords: "Total Words",
      chapterReads: "Chapter Reads",
      yourNovels: "Your Novels",
      loadingNovels: "Loading your novels...",
      noNovels: "You haven't created any novels yet.",
      createFirstNovel: "Create Your First Novel",
      novel: "Novel",
      stats: "Stats",
      status: "Status",
      lastUpdated: "Last Updated",
      actions: "Actions",
      editNovel: "Edit Novel",
      manageChapters: "Manage Chapters",
      addChapter: "Add Chapter",
      deleteNovel: "Delete Novel",
      more: "more",
      confirmDelete: "Are you sure you want to delete this novel? This action cannot be undone.",
      deleteFailed: "Failed to delete novel. Please try again.",
      ongoing: "Ongoing",
      completed: "Completed",
      hiatus: "Hiatus"
    },

    // Admin dashboard (AdminDashboardPage.jsx)
    adminDashboard: {
      title: "Dashboard",
      subtitle: "Welcome to the command center. Manage your platform's ecosystem from a single point of control.",
      modules: {
        users: {
          title: "User Management",
          description: "Control user roles, monitor status, and handle bans or account restorations.",
          stats: "Manage Accounts"
        },
        novels: {
          title: "Novels Database",
          description: "Curate content, feature promising stories, and manage soft or hard deletions.",
          stats: "Oversee Library"
        },
        comments: {
          title: "Community Moderation",
          description: "Ensure community guidelines by reviewing, removing, or restoring comments.",
          stats: "Review Discussions"
        }
      }
    },

    // Admin users (AdminUsersPage.jsx)
    adminUsers: {
      title: "Users",
      filters: {
        search: "Search",
        status: "Status",
        role: "Role",
        includeDeleted: "Include deleted"
      },
      placeholders: {
        search: "username or email"
      },
      options: {
        all: "All"
      },
      table: {
        user: "User",
        role: "Role",
        status: "Status",
        created: "Created",
        actions: "Actions"
      },
      actions: {
        refresh: "Refresh",
        restore: "Restore",
        block: "Block",
        unblock: "Unblock",
        softDelete: "Soft delete",
        hardDelete: "Hard delete"
      },
      confirms: {
        blockUser: "Block this user?",
        unblockUser: "Unblock this user?",
        softDeleteUser: "Soft delete this user?",
        hardDeleteUser: "Permanently delete this user? This cannot be undone.",
        restoreUser: "Restore this user?"
      },
      errors: {
        loadFailed: "Failed to load users",
        updateFailed: "Update failed",
        actionFailed: "Action failed",
        deleteFailed: "Delete failed",
        restoreFailed: "Restore failed"
      },
      empty: "No users found.",
      pagination: {
        pageOf: "Page {page} of {pages}",
        page: "Page {page}",
        total: "Total {total}",
        prev: "Prev",
        next: "Next"
      }
    },

    // Admin novels (AdminNovelsPage.jsx)
    adminNovels: {
      title: "Novels",
      filters: {
        search: "Search",
        pageSize: "Page size"
      },
      placeholders: {
        search: "title"
      },
      table: {
        title: "Title",
        author: "Author",
        status: "Status",
        featured: "Featured",
        actions: "Actions"
      },
      actions: {
        refresh: "Refresh",
        feature: "Feature",
        unfeature: "Unfeature",
        softDelete: "Soft delete",
        hardDelete: "Hard delete"
      },
      confirms: {
        softDeleteNovel: "Soft delete this novel?",
        hardDeleteNovel: "Permanently delete this novel and chapters? This cannot be undone."
      },
      errors: {
        loadFailed: "Failed to load novels",
        actionFailed: "Action failed",
        deleteFailed: "Delete failed"
      },
      empty: "No novels found.",
      pagination: {
        pageOf: "Page {page} of {pages}",
        page: "Page {page}",
        total: "Total {total}",
        prev: "Prev",
        next: "Next"
      }
    },

    // Admin comments (AdminCommentsPage.jsx)
    adminComments: {
      title: "Comments",
      filters: {
        search: "Search",
        novelId: "Novel ID",
        authorId: "Author ID",
        deleted: "Deleted"
      },
      placeholders: {
        search: "content",
        novelId: "novelId",
        authorId: "authorId"
      },
      options: {
        all: "All",
        deleted: "Deleted",
        notDeleted: "Not deleted"
      },
      table: {
        content: "Content",
        author: "Author",
        novel: "Novel",
        deleted: "Deleted",
        actions: "Actions"
      },
      actions: {
        refresh: "Refresh",
        restore: "Restore",
        softDelete: "Soft delete",
        hardDelete: "Hard delete"
      },
      confirms: {
        softDeleteComment: "Soft delete this comment?",
        hardDeleteComment: "Permanently delete this comment and its replies? This cannot be undone.",
        restoreComment: "Restore this comment?"
      },
      errors: {
        loadFailed: "Failed to load comments",
        deleteFailed: "Delete failed",
        restoreFailed: "Restore failed"
      },
      empty: "No comments found.",
      pagination: {
        pageOf: "Page {page} of {pages}",
        page: "Page {page}",
        total: "Total {total}",
        prev: "Prev",
        next: "Next"
      }
    },

    // Library (LibraryPage.jsx)
    library: {
      title: "My Library",
      loadingLibrary: "Loading your library...",
      emptyLibrary: "Your library is empty. Start adding novels to keep track of your reading!",
      emptyCategory: "You don't have any novels in your \"{category}\" list.",
      browseNovels: "Browse Novels",
      all: "All",
      willRead: "Plan to Read",
      reading: "Reading",
      completed: "Completed",
      onHold: "On Hold",
      dropped: "Dropped",
      lastRead: "Last read: Ch.",
      changeStatus: "Change Status",
      removeFromLibrary: "Remove from Library",
      continueReading: "Continue Reading",
      startReading: "Start Reading",
      viewNovel: "View Novel"
    },

    // Browse (BrowsePage.jsx)
    browsePage: {
      title: "Browse Novels",
      filters: "Filters",
      reset: "Reset",
      searchPlaceholder: "Search novels...",
      genre: "Genre",
      allGenres: "All Genres",
      status: "Status",
      allStatuses: "All Statuses",
      sortBy: "Sort By",
      order: "Order",
      descending: "Descending",
      ascending: "Ascending",
      resetFilters: "Reset Filters",
      applyFilters: "Apply Filters",
      activeFilters: "Active filters:",
      search: "Search",
      sort: "Sort",
      loadingNovels: "Loading novels...",
      noNovelsFound: "No novels found matching your filters.",
      previous: "Previous",
      next: "Next",
      genres: {
        fantasy: "Fantasy",
        scienceFiction: "Science Fiction",
        mystery: "Mystery",
        thriller: "Thriller",
        romance: "Romance",
        horror: "Horror",
        adventure: "Adventure",
        historical: "Historical",
        drama: "Drama",
        comedy: "Comedy"
      },
      statuses: {
        ongoing: "Ongoing",
        completed: "Completed",
        hiatus: "On Hiatus"
      },
      sortOptions: {
        recentlyAdded: "Recently Added",
        recentlyUpdated: "Recently Updated",
        mostViewed: "Most Viewed",
        highestRated: "Highest Rated",
        chapterCount: "Chapter Count"
      }
    },

    // Chapter page (ChapterPage.jsx)
    chapterPage: {
      loadingChapter: "Loading chapter...",
      chapterDataNotAvailable: "Chapter data is not available",
      backToNovel: "Back to Novel",
      readingSettings: "Reading Settings",
      fontSize: "Font Size",
      lineHeight: "Line Height",
      fontFamily: "Font Family",
      sansSerif: "Sans-serif",
      serif: "Serif",
      monospace: "Monospace",
      theme: "Theme",
      light: "Light",
      dark: "Dark",
      close: "Close",
      previous: "Previous",
      next: "Next",
      chapters: "Chapters",
      chapter: "Chapter"
    },

    // Contact (ContactPage.jsx)
    contactPage: {
      title: "Contact Us",
      contactInfo: "Contact Information",
      email: "Email",
      phone: "Phone",
      address: "Address",
      followUs: "Follow Us",
      sendMessage: "Send Us a Message",
      messageSent: "Message Sent!",
      thankYou: "Thank you for contacting us. We'll get back to you as soon as possible.",
      sendAnother: "Send Another Message",
      yourName: "Your Name",
      emailAddress: "Email Address",
      subject: "Subject",
      message: "Message",
      requiredFields: "Required fields",
      sending: "Sending...",
      send: "Send Message",
      placeholders: {
        name: "John Doe",
        email: "johndoe@example.com",
        subject: "How can we help you?",
        message: "Your message here..."
      }
    },

    // Create chapter page (CreateChapterPage.jsx)
    createChapterPage: {
      title: "Add New Chapter",
      novel: "Novel",
      chapterNumber: "Chapter #",
      chapterTitle: "Chapter Title",
      chapterContent: "Chapter Content",
      status: "Status",
      draft: "Draft",
      published: "Published",
      draftInfo: "Draft chapters are only visible to you until published",
      minimumChars: "Minimum 100 characters required",
      titlePlaceholder: "Enter chapter title",
      contentPlaceholder: "Write your chapter content here...",
      cancel: "Cancel",
      saving: "Saving...",
      saveChapter: "Save Chapter",
      contentLengthError: "Chapter content must be at least 100 characters long.",
      saveFailed: "Failed to create chapter. Please try again.",
      loadingNovel: "Loading novel data..."
    },

    // Language switcher (LanguageSwitcher.jsx)
    languageSwitcher: {
      changeLanguageAria: "Change language"
    },

    // Edit novel page (EditNovelPage.jsx)
    editNovelPage: {
      title: "Edit Novel",
      loadFailed: "Failed to load novel data.",
      loadFailedLater: "Failed to load novel data. Please try again later.",
      maxGenresAlert: "You can select up to {max} genres",
      tagExistsAlert: "This tag already exists",
      maxTagsAlert: "You can add up to {max} tags",
      selectGenreError: "Please select at least one genre",
      updateFailed: "Failed to update the novel. Please try again.",
      tagsHelp: "Tags help readers find your novel (max {max} characters per tag)",
      saving: "Saving...",
      saveChanges: "Save Changes"
    },

    // Edit chapter page (EditChapterPage.jsx)
    editChapterPage: {
      title: "Edit Chapter {chapterNumber}",
      novelLabel: "Novel:",
      loadChapterFailed: "Failed to load chapter data",
      loadNovelFailed: "Failed to load novel data",
      loadFailedLater: "Failed to load data. Please try again later.",
      updateFailed: "Failed to update chapter. Please try again."
    },

    // Profile page (ProfilePage.jsx)
    profilePage: {
      title: "Your Profile",
      username: "Username",
      email: "Email",
      dateOfBirth: "Date of Birth",
      changePassword: "Change Password",
      currentPassword: "Current Password",
      newPassword: "New Password",
      confirmNewPassword: "Confirm New Password",
      passwordMinLength: "Password must be at least 8 characters",
      passwordsDoNotMatch: "Passwords do not match",
      newPasswordsMismatch: "New passwords do not match",
      currentPasswordRequired: "Current password is required to change password",
      updatedSuccess: "Profile updated successfully",
      noChanges: "No changes were made",
      updateFailed: "Failed to update profile",
      logout: "Logout",
      saving: "Saving...",
      saveChanges: "Save changes"
    },

    // Comments (CommentSection.jsx / Comment.jsx / CommentForm.jsx)
    comments: {
      title: "Discussion",
      countOne: "comment",
      countMany: "comments",
      signInToJoin: "Sign in to join the discussion",
      signIn: "Sign In",
      emptyState: "No one has commented yet. Be the first!",
      loadFailed: "Failed to load comments",
      loadFailedLater: "Failed to load comments. Please try again later.",
      deleteFailed: "Failed to delete comment. Please try again.",
      loadMore: "Load more comments",
      loading: "Loading...",
      anonymous: "Anonymous",
      anonymousInitial: "?",
      reply: "Reply",
      edit: "Edit",
      delete: "Delete",
      confirmDelete: "Are you sure you want to delete this comment?",
      showReplies: "Show replies ({count})",
      hideReplies: "Hide replies",
      noReplies: "No replies.",
      replyPlaceholder: "Write a reply...",
      formPlaceholder: "Write something...",
      cancel: "Cancel",
      emptyError: "Comment cannot be empty",
      tooLongError: "Comment is too long (maximum 1000 characters)",
      submitFailed: "Failed to submit comment. Please try again.",
      submitting: "Submitting...",
      saving: "Saving...",
      send: "Send",
      charCount: "{current}/1000 characters"
    },

    // FAQ (FAQPage.jsx)
    faqPage: {
      title: "Frequently Asked Questions",
      categories: {
        general: "General",
        reading: "Reading",
        writing: "Writing",
        accountSupport: "Account & Support"
      },
      stillHaveQuestionsTitle: "Still have questions?",
      stillHaveQuestionsDescription: "If you didn't find an answer to your question, contact us.",
      contactSupport: "Contact support"
    },

    // Terms (TermsPage.jsx)
    termsPage: {
      title: "Terms of Service"
    },

    // Privacy (PrivacyPage.jsx)
    privacyPage: {
      title: "Privacy Policy"
    },

    // Guidelines (GuidelinesPage.jsx)
    guidelinesPage: {
      title: "Author Guidelines"
    },

    // Author page (AuthorPage.jsx)
    authorPage: {
      loadFailedLater: "Failed to load author data. Please try again later.",
      loadingProfile: "Loading author profile...",
      tryAgain: "Try again",
      unknownAuthor: "Unknown author",
      novelsCountOne: "novel",
      novelsCountMany: "novels",
      averageRating: "Average rating",
      memberSince: "Member since {date}",
      novelsBy: "Novels by {author}",
      novelsByFallback: "this author",
      noNovelsBy: "No novels found by {author}",
      noNovelsYet: "This author hasn't published any novels yet.",
      browseOtherNovels: "Browse other novels"
    },

    // Chapter list (ChapterList.jsx)
    chapterList: {
      title: "Chapters",
      confirmDelete: "Are you sure you want to delete Chapter {chapterNumber}? This action cannot be undone.",
      deleteFailed: "Failed to delete chapter. Please try again.",
      views: "views",
      words: "words",
      published: "Published",
      draft: "Draft",
      editChapter: "Edit Chapter",
      deleteChapter: "Delete Chapter",
      noChapters: "No chapters available.",
      addFirstChapter: "Add your first chapter"
    },

    // Image uploader (ImageUploader.jsx)
    imageUploader: {
      defaultLabel: "Cover Image",
      invalidFileType: "Please select an image file (JPG, PNG, etc.)",
      previewAlt: "Preview",
      dropHere: "Drop an image here, or",
      browse: "browse",
      helper: "PNG, JPG, GIF up to 5MB"
    },

    // Rich text editors
    richTextEditor: {
      defaultPlaceholder: "Write something...",
      loading: "Loading editor..."
    },

    // Footer (Footer.jsx)
    footerSrOnly: {
      twitter: "Twitter page",
      github: "GitHub"
    },

    // Misc UI labels
    ui: {
      readerSettingsAria: "Reader settings",
      optionsAria: "Options",
      toggleFiltersAria: "Toggle filters"
    },

    // Manage chapters page extra action titles
    manageChaptersPage: {
      editChapterTitle: "Edit Chapter",
      viewChapterTitle: "View Chapter",
      deleteChapterTitle: "Delete Chapter",
      deleteFailed: "Failed to delete chapter. Please try again.",
      loadChaptersFailed: "Failed to load chapters",
      loadNovelFailed: "Failed to load novel data",
      loadFailedLater: "Failed to load data. Please try again later.",
      confirmDelete: "Are you sure you want to delete Chapter {chapterNumber}? This action cannot be undone."
    }
};

export default en;
