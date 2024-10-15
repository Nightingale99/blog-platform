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
    email: string;
    /**
     * The user's JSON Web Token.
     */
    token: string;
    /**
     * The user's username.
     */
    username: string;
    /**
     * The user's bio.
     */
    bio: string | null;
    /**
     * The user's image URL.
     */
    image: string | null;
  };
}

export type NewUserResponse = {
  user: {
    email: string;
    token: string;
    username: string;
    bio: string | null;
    image: string | null;
  };
};
