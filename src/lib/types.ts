export interface LoginInterface {
  email: string;
  password: string;
}

export interface UserInterface {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  isSuspended: boolean;
  profilePicture: string | null;
}

export interface UserDetailsInterface {
  fullName: string;
  username: string;
  phoneNumber: string;
  location: string;
  Bio: string;
  education: {
    institute: string;
    attendingCurrently: boolean;
    levelOfeducation: string;
    studied: string;
    to: string;
  }[];
  workExperience: {
    from: string;
    to: string;
    currentlyWorking: boolean;
    jobTitle: string;
    companyName: string;
  }[];
  skills: string[];
  interests: string[];
  isSuspended: boolean;
  profilePicture: string | null;
  earnedBadges: {
    _id: string;
    name: string;
    icon: string;
  }[];
}

export interface PostInterface {
  id: string;
  title: string;
  jobTitle?: string;
  description: string;
  datePosted: string;
  type: string;
}

interface fileType {
  URL: string;
  type: string;
}

export interface PostDetailsInterface extends PostInterface {
  user: {
    fullName: string;
    profilePicture: string;
    Bio: string;
  };
  desc: string;
  file: fileType[];
  files: fileType[];
  document: fileType[];
  media: fileType[];
  likeCount: number;
  commentCount: number;
  shareCount: number;
  createdAt: string;
}

export interface FollowerInterface {
  _id: string;
  fullName: string;
  profilePicture: string;
  email: string;
  location: string;
  phoneNumber: string;
}

export interface FollowingInterface extends FollowerInterface {}

export interface CommunityInterface {
  _id: string;
  name: string;
  description: string;
  createdAt: string;
  membersCount: number;
  postsCount: number;
  isDisabled: boolean;
}

export interface ProductInterface {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  price: number;
  quantity: number;
  isDisabled: boolean;
  pictures: string[];
}

export interface CommunityMembersInterface {
  _id: string;
  fullName: string;
  email: string;
  profilePicture: string | null;
  location: string;
  phoneNumber: string;
}

export interface ReportedUsersInterface {
  _id: string;
  reportedBy: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string;
    username: string;
  };
  reportedUser: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
    phoneNumber: string;
    location: string;
    isSuspended: boolean;
  };
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportedPostInterface {
  _id: string;
  reportedBy: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
  };
  postId: string;
  postType: string;
  reason: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  post: {
    _id: string;
    title: string;
    description: string;
    location: string;
    companyName: string;
    experience: string;
    jobType: string;
    files: {
      URL: string;
      type: string;
    }[];
    appURL: string;
    email: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      profilePicture: string | null;
      username: string;
    };
    likeCount: number;
    commentCount: number;
    shareCount: number;
    status: string;
    isLiked: boolean;
    isShared: boolean;
    isSaved: boolean;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ReportedGroupsInterface {
  _id: string;
  groupId: {
    _id: string;
    name: string;
    description: string;
    isDisabled: boolean;
  };
  user: {
    _id: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
    username: string;
  };
  reason: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupInterface {
  _id: string;
  name: string;
  description: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    profilePicture: string | null;
  };
  members: {
    _id: string;
    username: string;
    profilePicture: string | null;
    phoneNumber: string;
    location: string;
    role: string;
    joinedAt: string;
  }[];
  isPrivate: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  isDisabled: boolean;
  totalMembersCount: number;
  adminCount: number;
  memberCount: number;
  totalPostsCount: number;
  isJoined: boolean;
  isRequested: boolean;
  joinedUsersCount: number;
}

export interface GroupDetailsInterface {
  _id: string;
  name: string;
  description: string;
  isPrivate: boolean;
  coverImage: string | null;
  createdAt: string;
  updatedAt: string;
  creator: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    profilePicture: string | null;
  };
  members: {
    _id: string;
    role: string;
    joinedAt: string;
    user: {
      _id: string;
      fullName: string;
      email: string;
      phoneNumber: string;
    };
  }[];
  isDisabled: boolean;
  totalMembersCount: number;
  totalPostsCount: number;
}

export interface NotificationInterface {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  scheduledTime: string;
  isSent: boolean;
  type: string | null;
  image: string | null;
  byAdmin: boolean;
  receivers: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateNotificationInterface {
  title: string;
  description: string;
  date: string;
  time: string;
  scheduledTime?: string;
}

export interface UserGrowthAnalytics {
  totalActiveUsers: number;
  userGrowthData: {
    year: string;
    users: number;
  }[];
}

export interface SubscriptionPlan {
  status: string;
  autoRenew: boolean;
  features: string[];
  _id: string;
  title: string;
  price: number;
  description: string[];
  productId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  startDate: string;
}
