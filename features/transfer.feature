Feature: Transfer Funds Between Accounts

  Background:
    Given I am logged in with valid credentials

  Scenario: View transfer funds page
    When I navigate to the transfer funds page
    Then I should see the transfer form

  Scenario Outline: Transfer funds successfully between accounts
    When I navigate to the transfer funds page
    And I enter amount <amount> to transfer
    And I select account <fromAccount> as the source account
    And I select account <toAccount> as the destination account
    And I click the transfer button
    Then I should see the transfer confirmation message

    Examples:
      | amount | fromAccount | toAccount |
      | 100    | 12345       | 12456     |

  Scenario Outline: Validate insufficient funds
    When I navigate to the transfer funds page
    And I enter amount <amount> to transfer
    And I select account <fromAccount> as the source account
    And I select account <toAccount> as the destination account
    And I click the transfer button
    Then I should see an error message about insufficient funds

    Examples:
      | amount  | fromAccount | toAccount |
      | 1000000 | 12345       | 12456     |

  Scenario: Transfer button should validate required fields
    When I navigate to the transfer funds page
    Then the transfer button should require amount to be entered

  Scenario Outline: Validate transfer to the same account
    When I navigate to the transfer funds page
    And I enter amount <amount> to transfer
    And I select account <account> as the source account
    And I select account <account> as the destination account
    And I click the transfer button
    Then I should see an error message for same account transfer

    Examples:
      | amount | account |
      | 100    | 12345   |
