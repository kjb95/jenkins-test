package movierankchart.domain.movierank.constants;

import lombok.AllArgsConstructor;
import lombok.Getter;
import movierankchart.batch.constants.BatchConstants;
import movierankchart.batch.constants.BatchErrorMessage;
import movierankchart.domain.kobis.constants.KobisConstants;

import java.util.Arrays;
import java.util.NoSuchElementException;

@AllArgsConstructor
@Getter
public enum MovieRankType {
    TOTAL_DAILY(BatchConstants.SAVE_MOVIE_RANK_TOTAL_DAILY_STEP, "", KobisConstants.DAILY_BOX_OFFICE_PATH, BatchConstants.DAILY_API_CALLS, BatchConstants.DAILY_API_DATE_INTERVAL),
    KOREAN_DAILY(BatchConstants.SAVE_MOVIE_RANK_KOREAN_DAILY_STEP, KobisConstants.KOREAN_MOVIE, KobisConstants.DAILY_BOX_OFFICE_PATH, BatchConstants.DAILY_API_CALLS, BatchConstants.DAILY_API_DATE_INTERVAL),
    FOREIGN_DAILY(BatchConstants.SAVE_MOVIE_RANK_FOREIGN_DAILY_STEP, KobisConstants.FOREIGN_MOVIE, KobisConstants.DAILY_BOX_OFFICE_PATH, BatchConstants.DAILY_API_CALLS, BatchConstants.DAILY_API_DATE_INTERVAL),
    TOTAL_WEEKLY(BatchConstants.SAVE_MOVIE_RANK_TOTAL_WEEKLY_STEP, "", KobisConstants.WEEKLY_BOX_OFFICE_PATH, BatchConstants.WEEKLY_API_CALLS, BatchConstants.WEEKLY_API_DATE_INTERVAL),
    KOREAN_WEEKLY(BatchConstants.SAVE_MOVIE_RANK_KOREAN_WEEKLY_STEP, KobisConstants.KOREAN_MOVIE, KobisConstants.WEEKLY_BOX_OFFICE_PATH, BatchConstants.WEEKLY_API_CALLS, BatchConstants.WEEKLY_API_DATE_INTERVAL),
    FOREIGN_WEEKLY(BatchConstants.SAVE_MOVIE_RANK_FOREIGN_WEEKLY_STEP, KobisConstants.FOREIGN_MOVIE, KobisConstants.WEEKLY_BOX_OFFICE_PATH, BatchConstants.WEEKLY_API_CALLS, BatchConstants.WEEKLY_API_DATE_INTERVAL);

    private String stepName;  // Spring Batch Step 이름
    private String repNationCd;  // "": 전체영화, "K": 한국영화, "F": 해외영화
    private String kobisApiPath;  // 일간 또는 주간 KOBIS OPEN API 경로
    private int apiCallCount;  // 7: 일간 주간 KOBIS OPEN API 호출 횟수, 1: 일간 주간 KOBIS OPEN API 호출 횟수
    private int dateInterval;  // 1: 일간 KOBIS OPEN API 호출 날짜 간격, 7: 주간 KOBIS OPEN API 호출 날짜 간격

    public static MovieRankType findStepTypeByStepName(String stepName) {
        return Arrays.stream(MovieRankType.values())
                .filter(movieRankType -> movieRankType.getStepName()
                        .equals(stepName))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException(BatchErrorMessage.STEP_TYPE_NOT_FOUND));
    }
}
