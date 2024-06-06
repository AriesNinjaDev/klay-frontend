import { Shield } from "@styled-icons/boxicons-regular";
import styled from "styled-components/macro";

import { Localizer, Text } from "preact-i18n";

import Tooltip from "../Tooltip";

enum Badges {
    Developer = 1,
    Translator = 2,
    Supporter = 4,
    ResponsibleDisclosure = 8,
    Founder = 16,
    PlatformModeration = 32,
    ActiveSupporter = 64,
    Paw = 128,
    EarlyAdopter = 256,
    ReservedRelevantJokeBadge1 = 512,
    ReservedRelevantJokeBadge2 = 1024,
}

const BadgesBase = styled.div`
    gap: 8px;
    display: flex;
    flex-direction: row;

    img {
        width: 24px;
        height: 24px;
    }
`;

interface Props {
    badges: number;
    uid?: string;
}

export default function UserBadges({ badges, uid }: Props) {
    return (
        <BadgesBase>
            <Localizer>
                {badges & Badges.Founder ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.founder" />
                        }>
                        <img src="https://raw.githubusercontent.com/AriesNinjaDev/klay-frontend/24d7686a18e16195e03aa36bacda3d1d081b2cf6/src/assets/badges/founder.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.Developer ? (
                    <Tooltip content={<Text id="app.navigation.tabs.dev" />}>
                        <img src="https://app.revolt.chat/assets/badges/developer.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.Translator ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.translator" />
                        }>
                        <img
                            src="https://raw.githubusercontent.com/ariesninjadev/klay-frontend/master/src/assets/badges/jesuit.png"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                alert(
                                    "If you are a Jesuit student, please email jesuit@klay.aries.ninja to claim your badge.",
                                );
                            }}
                        />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.EarlyAdopter ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.early_adopter" />
                        }>
                        <img src="https://app.revolt.chat/assets/badges/early_adopter.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.PlatformModeration ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.moderation" />
                        }>
                        <img src="https://app.revolt.chat/assets/badges/moderation.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.ResponsibleDisclosure ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.responsible_disclosure" />
                        }>
                        <img src="https://raw.githubusercontent.com/ariesninjadev/klay-frontend/master/src/assets/badges/flycatcher.png" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.Supporter ? (
                    <Tooltip
                        content={
                            <Text id="app.special.popovers.user_profile.badges.supporter" />
                        }>
                        <img
                            src="https://app.revolt.chat/assets/badges/supporter.svg"
                            style={{
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                window.open(
                                    "https://buymeacoffee.com/ariesninja",
                                    "_blank",
                                );
                            }}
                        />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.ReservedRelevantJokeBadge1 ? (
                    <Tooltip content="sus">
                        <img src="https://app.revolt.chat/assets/badges/amog.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.ReservedRelevantJokeBadge2 ? (
                    <Tooltip content="It's Morbin Time">
                        <img src="https://app.revolt.chat/assets/badges/amorbus.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {badges & Badges.Paw ? (
                    <Tooltip content="🦊">
                        <img src="https://app.revolt.chat/assets/badges/paw.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
                {uid === "01EX2NCWQ0CHS3QJF0FEQS1GR4" ? (
                    <Tooltip content="🦝">
                        <img src="https://app.revolt.chat/assets/badges/raccoon.svg" />
                    </Tooltip>
                ) : (
                    <></>
                )}
            </Localizer>
        </BadgesBase>
    );
}
