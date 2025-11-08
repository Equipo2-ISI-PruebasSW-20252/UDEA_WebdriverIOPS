Feature: Account Management - Account Overview

  Background:
    Given I am logged in with valid credentials

  Scenario: View account overview
    Then I should see the account overview page
  Scenario Outline: Navigate to some account details
    When I navigate to an <account> details
    Then I should see my account number as <account> in the details page

    Examples:
      | account  | 
      | 12345    | 
      | 12456    |
      | 12567    |
  