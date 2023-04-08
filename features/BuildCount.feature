Feature: The build count is captured
  As build results come in,
  the build number of builds with the same status should be captured
  so we can see how well we're doing

  # Scenario: Build count is captured on successful build
  #   Given the build status is currently FIXED by "Dave" at 8:40 AM for branch "release/lead-leopard" with a count of 1
  #   And the build run by "Shannon" for branch "release/lead-leopard" at 10:10 AM was successful
  #   When the build run posts it's results
  #   Then the build status should be FIXED by "Dave" at 8:40 AM for branch "release/lead-leopard" with a count of 2

  # Scenario: Build count is captured on unsuccessful build
  #   Given the build status is currently BORKD by "Dave" at 8:40 AM for branch "release/lead-leopard" with a count of 2
  #   And the build run by "Shannon" for branch "release/lead-leopard" at 10:10 AM was unsuccessful
  #   When the build run posts it's results
  #   Then the build status should be BORKD by "Dave" at 8:40 AM for branch "release/lead-leopard" with a count of 3

  # Scenario: Build count is set if it's not initialized
  #   Given the build status is currently FIXED by "Dave" at 8:40 AM for branch "release/lead-leopard"
  #   And the build status count is undefined for branch "release/lead-leopard"
  #   And the build run by "Shannon" for branch "release/lead-leopard" at 10:10 AM was successful
  #   When the build run posts it's results
  #   Then the build status should be FIXED by "Dave" at 8:40 AM for branch "release/lead-leopard" with a count of 2

  # Scenario: Build count is set for new build statuses
  #   Given the build status is currently FIXED by "Dave" at 8:40 AM for branch "release/lead-leopard"
  #   And the build run by "Shannon" for branch "release/lead-leopard" at 10:10 AM was unsuccessful
  #   When the build run posts it's results
  #   Then the build status should be BORKD by "Shannon" at 10:10 AM for branch "release/lead-leopard" with a count of 1
