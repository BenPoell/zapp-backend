//form element styles
const listStyle = {
    topicList: 
    {
        textAlign: 'left',
        maxHeight: 440,
        overflowY: 'auto'
    },
    topicAvatarBadgeWrapper:
    {
        top: 0,
        left: 0
    },
    topicAvatarBadge:
    {
        top: 8,
        right: 8
    },
    topicAvatar:
    {
        alignItems: 'center'
    },
    topicPrimaryEllipsis:
    {
        /*width: '100%',*/
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0
    },	
    questionList: 
    {
        textAlign: 'left',
        maxHeight: 440,
        overflowY: 'auto'
    },
    questionAvatarBadgeWrapper:
    {
        top: 0,
        left: 0
    },
    questionAvatarBadge:
    {
        top: 8,
        right: 8
    },
    questionAvatar:
    {
        alignItems: 'center'
    },
    questionPrimaryEllipsis:
    {
        /*width: '100%',*/
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        margin: 0
    },
	answerUL:
	{
		margin: '0',
		padding: '0',
		listStyleType: 'none'
	},
	answerLI:
	{
		margin: '0',
		padding: '0',
		listStyleType: 'none',
		zIndex: 10000
	}	
}
module.exports = listStyle;
