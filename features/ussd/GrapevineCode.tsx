
import React from 'react';

export const GrapevineCode: React.FC = () => {
  const code = `
<?php
// Grapevine USSD Handler (Conceptual)

header('Content-Type: text/plain');

// Inputs from Grapevine Gateway
$msisdn = $_GET['msisdn'];
$session_id = $_GET['sessionid'];
$input = $_GET['input']; // The user's input
$stage = $_GET['stage']; // 'First' or 'Continued'

// Connect to Supabase/DB (Pseudo-code)
$user_state = db_get_session($session_id); 
$step = $user_state ? $user_state['step'] : 0;

$response = "";

if ($stage == 'First') {
    $response = "Welcome to JobQ\nTo register, reply with your Invitation Code";
    db_save_session($session_id, ['step' => 1]);
} else {
    switch ($step) {
        case 1:
            // Verify Invite Code
            if ($input == '123456789') {
                $response = "Identification Document\n1. RSA ID\n2. Passport\n3. Permit\n4. Other";
                db_save_session($session_id, ['step' => 2]);
            } else {
                $response = "Invalid Code. Try again:";
                // Keep step 1
            }
            break;

        case 2:
            // ID Type Selection
            if ($input == '1') {
                $response = "Reply with your ID number:";
                db_save_session($session_id, ['step' => 3, 'id_type' => 'RSA_ID']);
            } elseif ($input == '2') {
                $response = "Reply with Passport number:";
                db_save_session($session_id, ['step' => 3, 'id_type' => 'PASSPORT']);
            } else {
                 $response = "From where are you?\n1. Zim\n2. Bot\n3. Moz\n4. Nig";
                 db_save_session($session_id, ['step' => 4]); // Alternative flow
            }
            break;

        case 3:
            // Capture ID
            db_save_user_data($msisdn, 'id_number', $input);
            $response = "Reply with Gender(M/F),Age,Name,Surname\nEx: M,27,John,Doe";
            db_save_session($session_id, ['step' => 5]);
            break;
            
        case 5:
            // Capture Details
            $response = "How many years of experience do you have? (e.g. 2)";
            db_save_session($session_id, ['step' => 55]); // Intermediate Step
            break;

        case 55:
            // Capture Experience
            db_save_user_data($msisdn, 'experience_years', intval($input));
            $response = "Nearest Location\n1. Soweto\n2. Tembisa\n3. Alex";
            db_save_session($session_id, ['step' => 6]);
            break;

        case 6:
             // Capture Location and Finish
             db_save_user_data($msisdn, 'location_id', $input);
             $response = "Success! You are queued. Wait for our SMS.";
             // End session
             break;

        default:
            $response = "Thank you. You are in the Queue.";
            break;
    }
}

echo $response;
?>
`;

  return (
    <div className="h-full overflow-y-auto bg-[#1e1e1e] text-gray-300 p-6 font-mono text-sm">
      <h2 className="text-xl text-white font-sans font-bold mb-4">Proposed Backend Logic (Grapevine Integration)</h2>
      <p className="mb-4 text-xs text-gray-400 font-sans">
        This PHP logic demonstrates the stateless nature of USSD. We use a database (Supabase/Redis) to store the `step` 
        associated with the `sessionid`. When the user replies, we fetch the step, process logic, update the step, and echo plain text.
      </p>
      <pre className="whitespace-pre-wrap text-blue-300">
        {code}
      </pre>
    </div>
  );
};
