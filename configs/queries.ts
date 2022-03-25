import {gql} from '@apollo/client';

export const GET_SUBSCRIPTION = gql`
  {
    me {
      me {
        formal
      }
      subscription {
        active
        type
        productId
        startedAt
        endsAt
        autoRenew
        isCancelled
        isVerified
        os
        env
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation addTransaction(
    $os: String!
    $type: String!
    $productId: String!
    $transactionDate: String!
    $transactionId: String!
    $transactionReceipt: String!
  ) {
    addTransaction(
      os: $os
      type: $type
      productId: $productId
      transactionDate: $transactionDate
      transactionId: $transactionId
      transactionReceipt: $transactionReceipt
    ) {
      success
      errorCode
      message
      transaction {
        id
      }
    }
  }
`;
// n(os: String!, type: String!, productId: String!, transactionDate: String!, transactionId: String!, transactionReceipt: String!):
export const REFRESH_TOKEN = gql`
  mutation refreshToken($os: String!, $appVersion: String!) {
    refreshToken(os: $os, appVersion: $appVersion) {
      success
      errorCode
      message
      token
    }
  }
`;

export const SESSION = (id: string) => gql`
  {
    me {
      subscription {
        type
      }
    }
    session(id: "${id}") {
      errorCode
      success
      session {
        id
        name
        difficulty
        thumbnail
        activity {id title image}
        duration
        withEquipment
        coaches {id image}
        equipments {name quantity}
        muscleGroups {name}
        prerequisiteVideo
        countdownVideo
        countdownDuration
        exercises {
          id
          name
          thumbnail
        }
      }
    }
  }
`;

export const USER_SESSION = (id: string) => gql`
  {
    userSession(id: "${id}") {
      success
      message
      errorCode
      newBadges{name level}
      userSession {
        id
        createdAt
        updatedAt
        completedAt
        prerequisiteVideoSeen
        endsWithVideoSeen
        failure
        allExerciseCompleted
        isLastSessionForLevel
        levelCompletedWithoutFailure
        session {
          id
          name
          level
          activity {
            title
          }
        }
        utilisateur{id}
      }
    }
  }
`;

export const START_SESSION = gql`
  mutation startSession($sessionId: String!, $prerequisiteVideoSeen: Boolean) {
    startSession(
      sessionId: $sessionId
      prerequisiteVideoSeen: $prerequisiteVideoSeen
    ) {
      userSessionId
      success
      errorCode
      message
      action {
        entity {
          id
          exercise {
            id
            video
            needsValidation
          }
        }
      }
    }
  }
`;

export const GENERATE_CERTIFICATE = gql`
  mutation generateCertificate(
    $firstname: String!
    $lastname: String!
    $activityId: String!
    $level: Int
    $sessionId: String
  ) {
    generateCertificate(
      firstname: $firstname
      lastname: $lastname
      activityId: $activityId
      level: $level
      sessionId: $sessionId
    ) {
      success
      message
      errorCode
      certificate {
        id
        createdAt
        documentUrl
        lastname
        firstname
        level
      }
    }
  }
`;

export const BEFORE_STARTING_PAGE = (id: string) => gql`
  {
    beforeStartingPage(beforeStartingPageId: "${id}") {
      message
      errorCode
      newBadges { name, level }
      beforeStartingPage {
        id
        name
        thumbnail
        order 
        isEquipmentsList
        isVideo
        activity {
          id
          title
        }
        beforeStartingPageContents{
          id
          type
          content
          order
        }
      }
    }
  }
`;

export const END_SESSION_EXERCISE = gql`
  mutation endSessionExercise(
    $userSessionExerciseId: String!
    $failure: Boolean
  ) {
    endSessionExercise(
      userSessionExerciseId: $userSessionExerciseId
      failure: $failure
    ) {
      success
      message
      errorCode
      newBadges {
        name
        level
        video
      }
      action {
        type
        entity {
          id
          exercise {
            id
            video
            needsValidation
          }
        }
      }
      sessionEnded
    }
  }
`;

export const END_SESSION = gql`
  mutation endSession($userSessionId: String!) {
    endSession(userSessionId: $userSessionId) {
      success
      message
      errorCode
      newBadges {
        name
        level
        video
      }
      sessionEnded
    }
  }
`;
