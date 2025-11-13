Feature: Bill Payment Service

  Background:
    Given I am logged in with valid credentials

  Scenario: View bill payment page
    When I navigate to the bill payment page
    Then I should see the bill payment form

  Scenario Outline: Make a successful bill payment
    When I navigate to the bill payment page
    And I enter payee name "<payeeName>"
    And I enter address "<address>"
    And I enter city "<city>"
    And I enter state "<state>"
    And I enter zip code "<zipCode>"
    And I enter phone number "<phone>"
    And I enter account number "<account>"
    And I verify account number "<account>"
    And I enter payment amount "<amount>"
    And I select account "<fromAccount>" as the payment source
    And I click the send payment button
    Then I should see the payment details with payee "<payeeName>" and amount "<amount>"
    And I should see the bill payment confirmation message

    Examples:
      | payeeName       | address        | city       | state | zipCode | phone      | account | amount | fromAccount |
      | Electric Co.    | 123 Main St    | New York   | NY    | 10001   | 5551234567 | 987654  | 150    | 13344       |

  Scenario Outline: Validate insufficient funds for bill payment
    When I navigate to the bill payment page
    And I enter payee name "<payeeName>"
    And I enter address "<address>"
    And I enter city "<city>"
    And I enter state "<state>"
    And I enter zip code "<zipCode>"
    And I enter phone number "<phone>"
    And I enter account number "<account>"
    And I verify account number "<account>"
    And I enter payment amount "<amount>"
    And I select account "<fromAccount>" as the payment source
    And I click the send payment button
    Then I should see an error message about insufficient funds for payment

    Examples:
      | payeeName    | address     | city    | state | zipCode | phone      | account | amount  | fromAccount |
      | Big Payment  | 999 Test St | Dallas  | TX    | 75201   | 5551111111 | 999999  | 1000000 | 13344       |

  Scenario: Bill payment form should validate required fields
    When I navigate to the bill payment page
    Then the send payment button should require all fields to be filled

  Scenario Outline: Validate account mismatch
    When I navigate to the bill payment page
    And I enter payee name "<payeeName>"
    And I enter address "<address>"
    And I enter city "<city>"
    And I enter state "<state>"
    And I enter zip code "<zipCode>"
    And I enter phone number "<phone>"
    And I enter account number "<account>"
    And I verify account number "<wrongAccount>"
    And I enter payment amount "<amount>"
    And I select account "<fromAccount>" as the payment source
    And I click the send payment button
    Then I should see an error message about account mismatch

    Examples:
      | payeeName    | address     | city      | state | zipCode | phone      | account | wrongAccount | amount | fromAccount |
      | Test Company | 111 Test St | Chicago   | IL    | 60601   | 5552222222 | 111111  | 222222       | 100    | 13344       |
