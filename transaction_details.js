transactionDetails = {
    "id": "0agk0b00hn5hadh5000000n9",
    "sender": {
        "id": "000000000000000000000000",
        "name": "Unknown",
        "orgUnitName": null,
        "unknown": true,
        "enterprise": false,
        "deleted": false,
        "status": "Active"
    },
    "receiver": {
        "id": "000000000000000000000000",
        "name": "Unknown",
        "orgUnitName": null,
        "unknown": true,
        "enterprise": false,
        "deleted": false,
        "status": "Active"
    },
    "docType": {
        "id": "000000000000000000111111",
        "name": "Unknown",
        "status": "ENABLED",
        "type": null,
        "unknown": false,
        "custom": false
    },
    "processingStatus": "DONE W/ ERRORS",
    "processingStatusCode": 2,
    "userStatus": "IGNORED",
    "receivedTime": 1708509181000,
    "receivedDate": "Feb 21, 2024, 09:53:01 AM",
    "relatedDocumentCount": 1,
    "consolidatedStatusCode": 0,
    "nativeID": null,
    "matchedTxnMaxTimestamp": 0,
    "matchedTxnIds": [],
    "relatedTxnIds": [],
    "attributes": {},
    "taskCount": 0,
    "attributeCount": 13,
    "contentParts": ["xmldata"]
}

const messageFields = {
    receivedDate: "02/21/2024 03:23:01 PM IST"
    senderName : "Unknown"
    receiverName: "Unknown"
    processingStatus: "DONE W/ ERRORS"
    source: "Live"
}




{
    "type": "message",
    "attachments": [
        {
            "contentType": "application/vnd.microsoft.card.adaptive",
            "contentUrl": null,
            "content": {
                "type": "AdaptiveCard",
                "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                "version": "1.5",
                "body": [
                    {
                        "type": "TextBlock",
                        "text": "Transaction Details",
                        "weight": "Bolder",
                        "wrap": true
                    },
                    {
                        "type": "Container",
                        "items": [
                            {
                                "type": "ColumnSet",
                                "columns": [
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Date Received : ",
                                                "weight": "Bolder",
                                                "wrap": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "Sender : ",
                                                "weight": "Bolder",
                                                "wrap": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "Receiver : ",
                                                "weight": "Bolder",
                                                "wrap": true
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "Processing Status",
                                                "weight": "Bolder",
                                                "wrap": true
                                            }
                                        ]
                                    },
                                    {
                                        "type": "Column",
                                        "width": "stretch",
                                        "items": [
                                            {
                                                "type": "TextBlock",
                                                "text": "Feb 27, 2024, 04:56:28 AM"
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "Unknown"
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "Unknown"
                                            },
                                            {
                                                "type": "TextBlock",
                                                "text": "DONE"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ],
                        "style": "default",
                        "bleed": true,
                        "border": true
                    },
                    {
                        "type": "ActionSet",
                        "actions": [
                            {
                                "type": "Action.OpenUrl",
                                "title": "View Transaction Details",
                                "url": "https://localhost:4000/#/transactions?id=0agk0b00hnkennd900000ipm&source=live"
                            }
                        ]
                    }
                ]
            }
        }
    ]
}