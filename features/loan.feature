Feature: Loan Application Service

  Background:
    Given I am logged in with valid credentials

  Scenario: View loan application page
    When I navigate to the loan application page
    Then I should see the loan application form

  Scenario Outline: Apply for a loan successfully
    When I navigate to the loan application page
    And I enter loan amount "<loanAmount>"
    And I enter down payment "<downPayment>"
    And I select account "<fromAccount>" as the loan source
    And I click the apply now button
    Then I should see the loan request processed message
    And I should see the loan approval confirmation

    Examples:
      | loanAmount | downPayment | fromAccount |
      | 100        | 10          | 13344       |

  Scenario Outline: Loan rejection due to insufficient down payment
    When I navigate to the loan application page
    And I enter loan amount "<loanAmount>"
    And I enter down payment "<downPayment>"
    And I select account "<fromAccount>" as the loan source
    And I click the apply now button
    Then I should see an error message about insufficient funds for down payment

    Examples:
      | loanAmount | downPayment | fromAccount |
      | 5000       | 10000       | 13344       |

  Scenario: Validate required fields - all fields empty
    When I navigate to the loan application page
    And I click the apply now button
    Then I should see an error message

  Scenario Outline: Validate required fields - missing loan amount
    When I navigate to the loan application page
    And I enter down payment "<downPayment>"
    And I select account "<fromAccount>" as the loan source
    And I click the apply now button
    Then I should see an error message

    Examples:
      | downPayment | fromAccount |
      | 1000        | 13344       |

  Scenario Outline: Validate required fields - missing down payment
    When I navigate to the loan application page
    And I enter loan amount "<loanAmount>"
    And I select account "<fromAccount>" as the loan source
    And I click the apply now button
    Then I should see an error message

    Examples:
      | loanAmount | fromAccount |
      | 10000      | 13344       |

  Scenario Outline: View new account number after loan approval
    When I navigate to the loan application page
    And I enter loan amount "<loanAmount>"
    And I enter down payment "<downPayment>"
    And I select account "<fromAccount>" as the loan source
    And I click the apply now button
    Then I should see the loan request processed message
    And I should see my new account number

    Examples:
      | loanAmount | downPayment | fromAccount |
      | 1000       | 10          | 13344       |
