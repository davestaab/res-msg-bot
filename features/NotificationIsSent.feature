Feature: Notification is sent about current build results
As build results come in
A message is sent to the team
So everyone knows which branches are passing or failing

  Scenario: Build results are sent to the team
    Given the build run by "Dave" for branch "release/lead-leopard" at 02:00 PM was successful
    When the build run posts it's results
    Then the team should be notified with a message:
      ```
      {
        embeds: [
          {
            title: 'Test run Status',
            color: 5612386,
            fields: [
              {
                name: 'Branch',
                value: 'release/lead-leopard',
                inline: true
              },
              {
                name: 'Build',
                value: 'Successful',
              },
              {
                name: 'Requested By',
                value: 'Dave',
                inline: true
              }
            ]
          }
        ]
      }
      ```
