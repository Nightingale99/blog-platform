/**
 * The response from the API when creating a new user.
 */
export interface UserResponse {
  /**
   * The user object.
   */
  user: {
    /**
     * The user's email address.
     */
    email?: string;
    /**
     * The user's JSON Web Token.
     */
    token: string;
    /**
     * The user's username.
     */
    username?: string;
    /**
     * The user's bio.
     */
    bio?: string;
    /**
     * The user's image URL.
     */
    image?: string;
  };
}

export type RegisterUserResponse = {
  user: {
    email: string;
    token: string;
    username: string;
  };
};

export type SignInUserInput = {
  user: {
    email: string;
    password: string;
  };
};

export type SignUpUserInput = {
  user: {
    username: string;
    email: string;
    password: string;
  };
};

export type SignUpErrors = {
  errors: {
    email: string;
    username: string;
  };
};

export type UpdateProfileInput = {
  user: {
    username?: string;
    email?: string;
    bio?: string;
    image?: string;
  };
};
