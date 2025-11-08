Feature: ParaBank Login Feature

  Scenario Outline: As a user, I can log into the Parabank Accounts Service Page
    Given I am on the login page
    When I login with <username> and <password>
    Then I should see a text saying <message>

    Examples: 
      | username          | password | message           |
      | invalidUsername   | password | Error!            |
      | john              | demo     | Accounts Overview |

  Scenario: Login button is disabled when username and password are empty
    Given I am on the login page
    Then login button is disable if username or password is empty